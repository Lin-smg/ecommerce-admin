import { getCustomerList } from "@/api/customer";
export const User = {
  name: "Index",
  data() {
    const validateCustomer = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Invalid input"));
      } else {
        callback();
      }
    };
    return {
      activeName: "view",
      pageSize: 10,
      pageIndex: 1,
      customersData: [],
      totalCount: 0,
      customersCreateForm: {
        name: "",
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
      searchValue: "",
      listLoading: false,
      customerRule: {
        name: [{ required: true,trigger: 'blur', validator: validateCustomer }],
        email: [{ type: 'email' }],
        phone: [{ required: true,trigger: 'blur', validator: validateCustomer }],
        addressOne: [{ required: true,trigger: 'blur', validator: validateCustomer }],
        addressTwo: [{ required: true,trigger: 'blur', validator: validateCustomer }],
        city: [{ required: true,trigger: 'blur', validator: validateCustomer }],
        stateOrProvince: [{ required: true,trigger: 'blur', validator: validateCustomer }],
        zipCode: [{ required: true,trigger: 'blur',validator: validateCustomer }],
        country: [{ required: true,trigger: 'blur', validator: validateCustomer }],
        comments: [{ required: true,trigger: 'blur', validator: validateCustomer }],
        internalNotes: [{ required: true,trigger: 'blur', validator: validateCustomer }],
        companyName: [{ required: true,trigger: 'blur', validator: validateCustomer }],
        account: [{ required: true,trigger: 'blur', validator: validateCustomer }]
      }
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
      if (this.activeName === "view") {
        this.getCustomers();
      } else if (this.activeName === "create") {
        this.resetCreateCustomersForm();
      }
    },

    resetCreateCustomersForm() {
      this.customersCreateForm.name = "";
      this.customersCreateForm.email = "";
      this.customersCreateForm.phone = "";
      this.customersCreateForm.imageUrl = "";
      this.customersCreateForm.addressOne = "";
      this.customersCreateForm.addressTwo = "";
      this.customersCreateForm.city = "";
      this.customersCreateForm.stateOrProvince = "";
      this.customersCreateForm.zipCode = "";
      this.customersCreateForm.country = "";
      this.customersCreateForm.comments = "";
      this.customersCreateForm.internalNotes = "";
      this.customersCreateForm.companyName = "";
      this.customersCreateForm.account = "";
    },

    async getCustomers() {
      const params = {
        group: "",
        sort: "",
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ""
      };

      this.listLoading = true;
      getCustomerList(params).then(response => {
        this.customersData = response.data;
        this.pageIndex = response.meta.curPage;
        this.pageSize = response.meta.perPage;
        this.totalCount = response.meta.totalResults;
        this.listLoading = false;
      });
    },

    async createCustomers() {
      this.$refs.customersCreateForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("customer/createCustomer", this.customersCreateForm)
            .then(() => {
              this.handleTab("view");
            })
            .catch(() => {
              console.log("Create customer error");
            });
        } else {
          this.$message.error("Invalid create customer");
        }
      });
    },

    updateCustomers(row) {
      this.handleTab("update");
      this.customersCreateForm = row;
      console.log("Update customer =>", this.customersCreateForm);
    },

    async updateCustomerOk() {
      this.$refs.customersCreateForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("customer/updateCustomer", this.customersCreateForm)
            .then(() => {
              this.resetCreateCustomersForm();
              this.handleTab("view");
            })
            .catch(() => {
              console.log("Update customer error");
            });
        }
      });
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

    async deleteCustomer(data) {
      console.log("delete", data);
      this.$store
        .dispatch("customer/deleteCustomer", data)
        .then(() => {
          this.handleTab("view");
        })
        .catch(() => {
          console.log("Delete customer error");
        });
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
};

function groupBy(array, key) {
  const result = {};
  array.forEach(item => {
    if (!result[item[key]]) {
      result[item[key]] = [];
    }
    result[item[key]].push(item);
  });
  return result;
}
