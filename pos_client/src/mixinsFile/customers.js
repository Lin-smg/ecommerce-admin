import { getUserList } from "@/api/user";
export const User = {
  name: "Index",
  data() {
    return {
      activeName: "view",
      pageSize: 10,
      pageIndex: 1,
      customersData: [],
      totalCount: 0,
      customersCreateForm: {
        customerName: "",
        email: "",
        phone: "",
        imageUrl: "",
        addressOne: "",
        addressTwo: "",
        city: "",
        stateOrProvince: "",
        zipCode: "",
        country: "",
        comments: "",
        internalNotes: "",
        companyName: "",
        account: ""
      },
      searchValue: ""
    };
  },
  created() {
    this.getCustomers();
  },
  computed: {
    groups() {
      return groupBy(this.$store.getters.allPermission, "menuCode");
    }
  },
  methods: {
    handleTab(tab) {
      this.activeName = tab;
    },

    getCustomers() {
      this.customersData = [
        {
          customerName: "Mama"
        }
      ];
    },

    createCustomers() {},

    resetCreateCustomers() {},

    updateCustomers() {},

    resetUpdateCustomers() {},

    updateCustomers() {
      this.handleTab("update");
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getCustomers();
    },

    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getCustomers();
    },

    searchClick() {
      this.getCustomers();
    },

    deleteCustomers(data) {
      console.log("delete", data);
    },

    handleAvatarSuccess(res, file) {
      console.log("Image Upload");
      this.customersCreateForm.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {
      console.log("File=>", file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        this.$message.error("Avatar picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
}

function groupBy(array, key) {
  const result = {}
  array.forEach(item => {
    if (!result[item[key]]) {
      result[item[key]] = []
    }
    result[item[key]].push(item)
  })
  return result
}
