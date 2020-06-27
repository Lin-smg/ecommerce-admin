export const DailyReport = {
  data() {

    return {
      pageSize: 10,
      pageIndex: 1,
      dialog: {
        visible: false,
        title: ''

      },
      dreportData:[{

      }],

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: 'Today',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: 'Yesterday',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: 'A week ago',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      ddate: ''

    }
  },

  methods: {

    onPageSizeChange(val) {
      this.pageSize = val
    },

    onPageIndexChange(val) {
      this.pageIndex = val
    },

    toUpperCaseWord(object, key) {
      const upperWord = object[key].toUpperCase()
      object[key] = upperWord
    }
  }
}
