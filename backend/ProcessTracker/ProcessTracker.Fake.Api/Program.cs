using MailerSendNetCore.Common.Extensions;
using ProcessTracker.Fake.Api.Endpoints;
using SendGrid.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy  =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

builder.Services.AddMailerSendEmailClient(builder.Configuration.GetSection("MailerSend"));

builder.Services.AddSendGrid(options =>
{
    options.ApiKey = Environment.GetEnvironmentVariable("SENDGRID_KEY_TESTING");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

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

app.MapPost("/email-sendgrid", PostEmailSendGridEndpoint.PostEmailSendGrid);



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