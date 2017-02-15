using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mailbord.Repository.Mail
{
    public interface IMailManager
    {
        void Dispose();
        Task<IdentityResult> CreateAsync(Mail mail);
        Task<IdentityResult> UpdateAsync(Mail mail);
        Task<IdentityResult> DeleteAsync(Mail mail);
        Task<Mail> FindByIdAsync(string mailId);
        Task<Mail> FindByNameAsync(string mailName);
        Task<IdentityResult> CreateAsync(Mail mail, string password);
        Task<Mail> FindAsync(string mailName, string password);
        Task<bool> CheckPasswordAsync(Mail mail, string password);
        Task<bool> HasPasswordAsync(string mailId);
        Task<IdentityResult> AddPasswordAsync(string mailId, string password);
        Task<IdentityResult> ChangePasswordAsync(string mailId, string currentPassword, string newPassword);
        Task<IdentityResult> RemovePasswordAsync(string mailId);
        Task<string> GetSecurityStampAsync(string mailId);
        Task<IdentityResult> UpdateSecurityStampAsync(string mailId);
        Task<string> GeneratePasswordResetTokenAsync(string mailId);
        Task<IdentityResult> ResetPasswordAsync(string mailId, string token, string newPassword);
        Task<IdentityResult> AddToRoleAsync(string mailId, string role);
        Task<IdentityResult> AddToRolesAsync(string mailId, params string[] roles);
        Task<IdentityResult> RemoveFromRolesAsync(string mailId, params string[] roles);
        Task<IdentityResult> RemoveFromRoleAsync(string mailId, string role);
        Task<IList<string>> GetRolesAsync(string mailId);
        Task<bool> IsInRoleAsync(string mailId, string role);
        Task<string> GetEmailAsync(string mailId);
        Task<IdentityResult> SetEmailAsync(string mailId, string email);
        Task<Mail> FindByEmailAsync(string email);
        Task<string> GenerateEmailConfirmationTokenAsync(string mailId);
        Task<IdentityResult> ConfirmEmailAsync(string mailId, string token);
        Task<bool> IsEmailConfirmedAsync(string mailId);
        Task<string> GetPhoneNumberAsync(string mailId);
        Task<IdentityResult> SetPhoneNumberAsync(string mailId, string phoneNumber);
        Task<IdentityResult> ChangePhoneNumberAsync(string mailId, string phoneNumber, string token);
        Task<bool> IsPhoneNumberConfirmedAsync(string mailId);
        Task<string> GenerateChangePhoneNumberTokenAsync(string mailId, string phoneNumber);
        Task<bool> VerifyChangePhoneNumberTokenAsync(string mailId, string token, string phoneNumber);
        Task<bool> VerifymailTokenAsync(string mailId, string purpose, string token);
        Task<string> GeneratemailTokenAsync(string purpose, string mailId);
        Task<IList<string>> GetValidTwoFactorProvidersAsync(string mailId);
        Task<bool> VerifyTwoFactorTokenAsync(string mailId, string twoFactorProvider, string token);
        Task<string> GenerateTwoFactorTokenAsync(string mailId, string twoFactorProvider);
        Task<IdentityResult> NotifyTwoFactorTokenAsync(string mailId, string twoFactorProvider, string token);
        Task<bool> GetTwoFactorEnabledAsync(string mailId);
        Task<IdentityResult> SetTwoFactorEnabledAsync(string mailId, bool enabled);
        Task SendEmailAsync(string mailId, string subject, string body);
        Task SendSmsAsync(string mailId, string message);
        IQueryable<Mail> mails { get; }

    }
}

