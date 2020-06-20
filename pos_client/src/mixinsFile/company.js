import { getCompany } from '@/api/company'
export const Company = {
  data() {
    return {
      companyProfile: this.initCompanyForm(),
      fileName: '',
      editVisible: false,
      imgEdit: false,
      imgUpload: false,
      imageUrl: '',
      companyUploadUrl: ''
    }
  },
  created() {
    this.companyUploadUrl = process.env.VUE_APP_BASE_API + '/shared/companyIMG'
    this.imageUrl = process.env.VUE_APP_BASE_API + '/shared/company_profile.jpg'
    this.getCompany()
  },
  methods: {
    initCompanyForm() {
      return {
        id: '1',
        companyCode: 'COM0001',
        companyName: 'company name',
        companyType: 'type',
        companyPhone: '0987654321',
        companyEmail: 'company@gmail.com',
        companyAddress: 'NO(42), 1st floor, Mae Zi Gone Rd, Hlaing, Yangon',
        companyLogo: ''
      }
    },
    async getCompany() {
      this.listLoading = true
      await getCompany().then(response => {
        if (response.data === '') {
          this.companyProfile = this.initCompanyForm()
        } else {
          this.companyProfile = response.data
        }
        this.listLoading = false
      })
    },
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
    },
    createCompanyProfile() {
      // this.$refs.userCreateForm.validate(valid => {
      //   if (valid) {
      this.companyProfile.companyLogo = '/files/company_profile.jpg'
      this.loading = true
      this.$store.dispatch('company/createCompany', this.companyProfile).then(() => {
        this.editVisible = false
        this.handleTab('view')
        this.getUnits()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }

}
