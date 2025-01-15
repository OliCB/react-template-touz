using MailerSendNetCore.Common.Interfaces;
using MailerSendNetCore.Emails.Dtos;

namespace ProcessTracker.Fake.Api.Endpoints;

public static class PostEmailEndpoint
{
    public static async Task PostEmail(HttpContext context, IMailerSendEmailClient mailerSendEmailClient, CancellationToken ct)
    {
        var emailParams = new MailerSendEmailParameters()
            .WithFrom("info-processtracker@trial-vywj2lprowm47oqz.mlsender.net", "Process Tracker Info")
            .WithTo("olivier.couture-bienvenue@vooban.com")
            .WithSubject("Testing, testing...")
            .WithHtmlBody(
                @"
<h1>BONJOUR!</h1>
<div>
    <b>Ceci est un <a href=""https://www.youtube.com/watch?v=dQw4w9WgXcQ"">test</a></b>
</div>
<img src=""https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Juvenile_Ragdoll.jpg/2560px-Juvenile_Ragdoll.jpg"" />
");

        await mailerSendEmailClient.SendEmailAsync(emailParams, ct);
    }
}