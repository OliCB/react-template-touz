using MailerSendNetCore.Common.Extensions;
using ProcessTracker.Fake.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS",
        policy  =>
        {
            policy.AllowAnyOrigin();
            policy.AllowAnyHeader();
        });
});

builder.Services.AddMailerSendEmailClient(builder.Configuration.GetSection("MailerSend"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CORS");

app.MapGet("/users", () =>
    {
        var rand = new Random();
        var users = Enumerable.Range(1, 4).Select(index =>
                new User(index.ToString(), Enumerable.Range(0, 3).Select(pindex => new Process($"proc-{(index - 1) * 3 + pindex}", (Status)rand.Next(4)))))
            .ToArray();
        return users;
    })
    .WithName("GetUsers")
    .WithOpenApi();

app.MapPost("/email", PostEmailEndpoint.PostEmail);



app.Run();

enum Status
{
    Pending,
    Running,
    Succeeded,
    Failed
}

record User(string Id, IEnumerable<Process> Processes);

record Process(string Id, Status Status);