export const Product = {
  data() {
    return {
      activeName: 'view',
      searchValue: '',
      categoryList: [
        {
          categoryCode: 'C001',
          categoryName: 'cat1',
          description: ''
        },
        {
          categoryCode: 'C002',
          categoryName: 'cat2',
          description: ''
        }
      ],
      brandList: [
        {
          brandCode: 'C001',
          brandName: 'cat1',
          description: ''
        },
        {
          brandCode: 'C002',
          brandName: 'cat2',
          description: ''
        }
      ],
      product: {
        labelerCode: '',
        productCode: '',
        productName: '',
        packageSizeCode: '',
        category: {},
        brand: {},
        typeIndicator: '',
        expDate: '',
        unitType: '',
        unitPerPkgSize: '',
        FDAApprovalDate: '',
        marketDate: '',
        tec: '',
        FDAProductName: '',
        clottingFactorIndicator: '',
        pediatricIndicator: '',
        PkgSizeIntroDate: '',
        purchasedProductDate: '',
        CODStatus: '',
        OTC: '',
        reactivationDate: '',
        lineExtensionIndicator: '',
        filler: ''
      },

      productData: [
        {
          labelerCode: 'labeler',
          productCode: 'code',
          productName: 'name',
          packageSizeCode: '',
          category: '',
          typeIndicator: '',
          expDate: '',
          unitType: '',
          unitPerPkgSize: '',
          FDAApprovalDate: '',
          marketDate: '',
          tec: '',
          FDAProductName: '',
          clottingFactorIndicator: '',
          pediatricIndicator: '',
          PkgSizeIntroDate: '',
          purchasedProductDate: '',
          CODStatus: '',
          OTC: '',
          reactivationDate: '',
          lineExtensionIndicator: '',
          filler: ''
        }
      ],
      imageUrl: ''
    }
  },
  methods: {

    // ///
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

    // //
    handleTab(tab) {
      console.log(tab)
      this.activeName = tab
    },

    createOk() {

    },
    createReset() {

    },

    updateOk() {

    },
    updateReset() {

    },

    editClick(data) {
      this.handleTab('update')
      this.product = data
    },

    deleteProduct(data) {

    }
  }
}
