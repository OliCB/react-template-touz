using MailerSendNetCore.Common.Interfaces;
using MailerSendNetCore.Emails.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace ProcessTracker.Fake.Api.Endpoints;

public static class PostEmailEndpoint
{
    public static async Task PostEmail(
        [FromBody]PostEmailParams emailParams,
        HttpContext context,
        IMailerSendEmailClient mailerSendEmailClient,
        CancellationToken ct)
    {
        var mailerParams = new MailerSendEmailParameters()
            .WithFrom("info-processtracker@trial-vywj2lprowm47oqz.mlsender.net", "Process Tracker Info")
            .WithTo(emailParams.RecipientEmail)
            .WithSubject(emailParams.Subject)
            .WithHtmlBody(emailParams.Body);

        await mailerSendEmailClient.SendEmailAsync(mailerParams, ct);
    }
}

public record PostEmailParams(string RecipientEmail, string Subject, string Body);