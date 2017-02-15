using System;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.UI.WebControls.WebParts;
using DevOne.Security.Cryptography.BCrypt;
using Mailbord.Core;
using Mailbord.Core.Utils;
using Mailbord.Data.RepoModels;
using Mailbord.Identity;
using Mailbord.Identity.Galleon;
using Mailbord.Identity.Identity;
using Mailbord.Models;

namespace Mailbord.Controllers
{
    [Authorize]
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        private readonly IApplicationUserManager _userManager;
        private readonly GalleonUserStore _galleonUserStore;

        public AccountController()
        {
            _userManager =
                new ApplicationUserManager(
                    new UserStore<IdentityUser>(MongoUtil<IdentityUser>.GetDefaultConnectionString()));
            _galleonUserStore = new GalleonUserStore(MongoUtil<GalleonRegistrationModel>.GetDefaultConnectionString());
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("registration")]
        public async Task<IHttpActionResult> Registration([FromBody] Registration model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var internalEmail = model.Nickname + "@steadywork.pro";
            var defaultAvataR = "https://mailbordpic.blob.core.windows.net/mailbordpic/default.png";
            var identityUser = new IdentityUser
            {
                UserName = model.Nickname + "@steadywork.pro",
                Email = model.Email,
                Name = model.Name,
                Company = model.Company,
                Image = defaultAvataR
            };

            var result = await _userManager.CreateAsync(identityUser, model.Password);

            if (!result.Succeeded)
                return BadRequest(ModelState);

            string galleonHashPassword = BCryptHelper.HashPassword(model.Password, BCryptHelper.GenerateSalt(10));
            bool matches = BCryptHelper.CheckPassword(model.Password, galleonHashPassword);

            GalleonRegistrationModel galleonUser = new GalleonRegistrationModel
            {
                Name = identityUser.Name,
                Email = identityUser.UserName,
                IsAdmin = false,
                Password = galleonHashPassword,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

             await _galleonUserStore.CreateAsync(galleonUser);

            return Ok();
        }

        [Authorize]
        [HttpGet]
        [Route("profiledata")]
        public async Task<IHttpActionResult> ProfileData()
        {
            var currentUser = User.Identity.Name;

            using (
                var repo =
                    new ApplicationUserManager(
                        new UserStore<IdentityUser>(MongoUtil<IdentityUser>.GetDefaultConnectionString())))
            {
                var user = await repo.FindByNameAsync(currentUser);

                var profiledata = new Profile
                {
                    Email = user.Email,
                    Name = user.Name,
                    Company = user.Company,
                    Image = user.Image,
                    UserName = user.UserName
                };

                return Ok(profiledata);
            }
        }

        [Authorize]
        [HttpPut]
        [Route("profileupdate")]
        public async Task<IHttpActionResult> ProfileUpdate(IdentityUser profile)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var currentUser = User.Identity.Name;

            var userinfo = await _userManager.FindByNameAsync(currentUser);
            var passwordValidation = await _userManager.CheckPasswordAsync(userinfo, profile.PasswordHash);

            if (passwordValidation)
            {
                var identityUser = new IdentityUser
                {
                    Id = userinfo.Id,
                    UserName = userinfo.UserName,
                    Email = profile.Email,
                    Name = profile.Name,
                    Company = profile.Company,
                    PasswordHash = userinfo.PasswordHash,
                    SecurityStamp = userinfo.SecurityStamp,
                    Roles = userinfo.Roles,
                    Image = userinfo.Image,
                };
                var result = await _userManager.UpdateAsync(identityUser);

                if (!result.Succeeded)
                    return BadRequest(ModelState);
                return Ok(identityUser);
            }
            return BadRequest(ModelState);
        }
    }
}