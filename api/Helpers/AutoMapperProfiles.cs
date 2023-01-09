using api.DTOs;
using api.Entity;
using AutoMapper;

namespace api.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDTO, AppUser>();
            CreateMap<AppUser, AppUserDTO>();
        }
    }
}