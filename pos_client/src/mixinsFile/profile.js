// import { getFile } from '@/api/app'
export const Profile = {
  data() {
    return {
      companyProfile: {
        code: 'COM0001',
        name: 'company name',
        type: 'type',
        phone: '0987654321',
        email: 'company@gmail.com',
        address: 'NO(42), 1st floor, Mae Zi Gone Rd, Hlaing, Yangon'
      },
      companyUploadUrl: 'http://localhost:3000/shared/companyIMG',
      editVisible: false,
      imgEdit: false,
      imgUpload: false,
      imageUrl: 'http://localhost:3000/shared/company_profile.jpg'
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }
  }

}
