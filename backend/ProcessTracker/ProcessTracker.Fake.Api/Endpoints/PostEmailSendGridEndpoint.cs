using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace ProcessTracker.Fake.Api.Endpoints;

public static class PostEmailSendGridEndpoint
{
    public static async Task PostEmailSendGrid(
        HttpContext context,
        [FromBody]PostEmailParams emailParams,
        ISendGridClient client, CancellationToken ct)
    {
        var from = new EmailAddress("info@em9259.fred-monitoring.ip-ddns.com", "Fred Monitoring");
        var to = new EmailAddress(emailParams.RecipientEmail);
        var msg = MailHelper.CreateSingleEmail(from, to,
            emailParams.Subject, emailParams.Body, emailParams.Body);

        await client.SendEmailAsync(msg, ct);
    }
}