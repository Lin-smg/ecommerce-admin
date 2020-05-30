<template>
  <div class="pos-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="15" style="height: 100vh">
          <div>
            <el-input v-model="searchValue" placeholder="Please input" class="input-with-select">
<!--              <el-select slot="prepend" v-model="searchType" style="width: 100px" placeholder="Select">-->
<!--                <el-option label="type1" value="type1" />-->
<!--                <el-option label="type2" value="type2" />-->
<!--              </el-select>-->
              <el-button slot="append" icon="el-icon-search" @click="searchClick" />
            </el-input>

            <el-carousel :autoplay="false" arrow="always" indicator-position="none" type="card" height="40px" style="margin: 10px" @change="change">
              <el-carousel-item v-for="item in 6" :key="item" style="text-align: center; line-height: 45px">
                <h3 class="medium">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>

<!--            <div style="text-align: center; margin: 10px">-->
<!--              <i class="el-icon-back" style="float:left; font-size: 35px" />-->
<!--              <el-button type="primary" style="width: 510px">Category</el-button>-->
<!--              <i class="el-icon-right" style="float:right; font-size: 35px" />-->
<!--            </div>-->
          </div>

          <div style="overflow-y: scroll;height: 80vh">
            <el-card v-for="i in 20" :key="i" shadow="hover" :body-style="{ padding: '0px' }" style="width: 140px; height: 170px; float: left; margin: 2px">
              <div>
                <el-image style="height: 90px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQr28OdEVKSN446VF2degUDZ9-WDSge_zQKsPYV0t3WzkuoVVee&usqp=CAU" />
                <div style="text-align: center; padding: 10px">
                  <span>product {{ i }}</span><br>
                  <span> tye </span><br>
                  <span> price </span>
                </div>
              </div>
            </el-card>
          </div>

        </el-col>
        <el-col :span="9" style="overflow-y: auto; height: 100vh">
          <div>
            <el-card shadow="hover" class="box-card" style="bottom: 0px">
              <div ref="header">
                <el-autocomplete
                  v-model="customer"
                  class="inline-input"
                  :fetch-suggestions="querySearch"
                  placeholder="Please Input"
                  @select="handleSelect"
                />
                <el-button type="primary">Create</el-button>
              </div>

              <div style="margin: 10px; height: 250px">
                <el-row>
                  <el-col :span="10" style="text-align: center"><span>Name</span></el-col>
                  <el-col :span="6" style="text-align: center"><span>Qty</span></el-col>
                  <el-col :span="6" style="text-align: center"><span>Price</span></el-col>
                  <el-col :span="2" />
                </el-row>
                <hr>

                <el-row v-for="i of 3" :key="i" style="margin-bottom: 5px">
                  <el-col :span="10"><div>Name</div></el-col>
                  <el-col :span="6" style="text-align: center"><div>
                    <el-input-number v-model="num" size="mini" :step="1" style="width: 90px" />
                  </div></el-col>
                  <el-col :span="6" style="text-align: center">
                    <span>10000</span>
                  </el-col>
                  <el-col :span="2" style="text-align: center">
                    <i class="el-icon-delete-solid" style="color: red" />
                  </el-col>
                </el-row>
              </div>
              <hr>

              <div>
                <label>Other Charges</label>
                <el-popover
                  placement="right"
                  width="400"
                  trigger="click"
                >
                  <div>
                    <span>Name:</span>
                    <el-input v-model="otherCharge.name" size="mini" />
                    <span>Amount:</span>
                    <el-input type="number" v-model="otherCharge.amount" size="mini"/>

                    <el-button type="primary" size="mini" @click="addOtherCharges">OK</el-button>
                  </div>
                  <el-button slot="reference" type="primary" size="mini" icon="el-icon-plus" />
                </el-popover>
                <el-row v-for="(data,i) of otherChargesList" :key="i" style="margin-bottom: 5px">
                  <el-col :span="14">
                    <span>{{data.name}}</span>
                  </el-col>
                  <el-col :span="6" style="text-align: center">
                    <el-input v-model="data.amount" size="mini" style="width: 60px" />
                  </el-col>
                  <el-col :span="3" style="text-align: left">
                    <i class="el-icon-delete-solid" style="color: red" @click="otherChargeDelete(data)"/>
                  </el-col>
                </el-row>
              </div>
              <hr>
              <div>
                <span>Total : </span>
                <span style="float:right;">10000</span>
              </div>
              <hr>
              <div>
                <span>Discount :</span>
                <span style="float:right;">0</span>
              </div>
              <div>
                <span>Tax :</span>
                <span style="float:right;">0</span>
              </div>
              <div>
                <span>FOC/Other :</span>
                <span style="float:right;">0</span>
              </div>

              <hr>

              <div>
                <span>Net Ammount :</span>
                <span style="float:right;">0</span>
              </div>
              <hr>
              <div>
                <span>Old Credit Amount :</span>
                <span style="float:right;">0</span>
              </div>
              <hr>
              <div>
                <span>Net Total Amount :</span>
                <span style="float:right;">0</span>
              </div>
              <div>
                <span>Cash Pay Amount :</span>
                <span style="float:right;">0</span>
              </div>
              <div>
                <span>Left Amount :</span>
                <span style="float:right;">0</span>
              </div>
              <hr>

              <div style="text-align: right">
                <el-button type="primary">Pay Now</el-button>
                <el-button type="primary">Pending</el-button>
              </div>

            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { POS } from '../../mixinsFile/pos'

export default {
  name: 'Index',
  mixins: [POS]
}
</script>

<style scoped>
  .pos-container{
    margin: 30px;
  }
  .el-carousel__item h3 {
    color: #ffffff;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #267bbf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #267bbf;
  }

</style>
