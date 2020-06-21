<template>
  <div class="pos-container">
    <div>
      <el-row :gutter="20">
        <el-col :span="15" style="height: 100vh">
          <div>
            <el-autocomplete v-model="searchValue" value-key="username" :fetch-suggestions="productSearch" :trigger-on-focus="false" placeholder="Please input" class="input-with-select" @select="searchClick">
              <el-button slot="append" icon="el-icon-search" @click="searchClick" />
            </el-autocomplete>

            <el-row>
              <el-col :span="2">
                <span style="line-height: 70px; font-size: 45px; color: #267bbf; cursor: pointer" class="el-icon-caret-left" @click="preCat" />
              </el-col>
              <el-col :span="20">
                <div id="cat" style="text-align: center; padding: 15px; overflow-x: hidden; overflow-y: hidden; height: 50px; border: 1px solid rgb(245, 232, 232); margin-top: 10px">
                  <span v-for="(item,i) in categoryList" :key="i" :style="{background: catActive === i ? '#b0c4e8' : ''}" style="cursor: pointer; margin: 5px; width: auto; height:30px; line-height: 10px; padding: 10px; border: 1px solid rgb(191, 180, 180); border-radius: 5px" @mouseover="catOver(i)" @click="chooseCatecory(item)">
                    <span>{{ item.categoryName }}</span>
                  </span>
                </div>
              </el-col>
              <el-col :span="2">
                <span style="line-height: 70px; font-size: 45px; color: #267bbf; cursor: pointer; float: right;" class="el-icon-caret-right" @click="nextCat" />
              </el-col>
            </el-row>

            <!-- <el-carousel :autoplay="false" arrow="always" indicator-position="none" type="card" height="40px" style="margin: 10px" @change="change">
              <el-carousel-item v-for="item in categoryList" :key="item.categoryCode" style="text-align: center; line-height: 45px">
                <h3 class="medium">{{ item.categoryName }}</h3>
              </el-carousel-item>
            </el-carousel> -->

          </div>

          <div style="overflow-y: scroll;height: 80vh">
            <el-card v-for="(item,i) in itemList" :key="i" shadow="hover" :body-style="{ padding: '0px' }" style="width: 140px; height: 170px; float: left; margin: 2px; cursor: pointer">
              <div @click="popShow(item)">
                <el-image style="height: 90px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQr28OdEVKSN446VF2degUDZ9-WDSge_zQKsPYV0t3WzkuoVVee&usqp=CAU" />
                <div style="text-align: center; padding: 10px">
                  <span>product {{ item.name }}</span><br>
                  <span> {{ item.type }} </span><br>
                  <span> {{ item.price }} Kyats</span>
                </div>
              </div>
            </el-card>
          </div>

          <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
          >
            <span>Code : </span><span>{{ selectedItem.code }}</span><br>
            <span>Name : </span><span>{{ selectedItem.name }}</span><br>
            <span>Price : </span><span>{{ selectedItem.price }} Kyats</span><br>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" type="primary" @click="addSaleItem">Confirm</el-button>
              <el-button size="small" @click="dialogVisible = false">Cancel</el-button>
            </span>
          </el-dialog>

        </el-col>
        <el-col :span="9" style="overflow-y: auto; height: 100vh">
          <div>
            <el-card shadow="hover" class="box-card" style="bottom: 0px">
              <div ref="header">
                <el-autocomplete
                  v-model="customer"
                  value-key="name"
                  class="inline-input"
                  :fetch-suggestions="customerSearch"
                  :highlight-first-item="true"
                  placeholder="Please Input"
                  @select="handleSelect"
                />
                <el-button type="primary" @click="createCustomer">Create</el-button>
              </div>

              <div style="margin: 10px; height: 250px">
                <el-row>
                  <el-col :span="10" style="text-align: center"><span>Name</span></el-col>
                  <el-col :span="6" style="text-align: center"><span>Qty</span></el-col>
                  <el-col :span="6" style="text-align: center"><span>Price</span></el-col>
                  <el-col :span="2" />
                </el-row>
                <hr>

                <el-row v-for="(item,i) of selectedItemList" :key="i" style="margin-bottom: 5px">
                  <el-col :span="10"><div>{{ item.data.name }}</div></el-col>
                  <el-col :span="6" style="text-align: center">
                    <el-row>
                      <el-col :span="6" style="text-align: center"><span size="mini" class="el-icon-remove" style="font-size: 25px; color: #8a7443" @click="item.count = item.count==1 || item.count <= 0 ? removeItem(i) : item.count-1, setTotal()" /></el-col>
                      <el-col :span="12" style="text-align: center; padding-left: 2px"><el-input v-model="item.count" style="width: 45px" size="mini" @change="item.count=item.count!='' ? item.count===0 ? removeItem(i) : 1 : item.count, setTotal()" /></el-col>
                      <!-- onkeyup="value=value.replace(/[^\d.]/g, '');"  -->
                      <el-col :span="6" style="text-align: center"><span size="mini" class="el-icon-circle-plus" style="font-size: 25px;color: #73c715" @click="item.count++, setTotal()" /></el-col>
                    </el-row>

                  </el-col>
                  <el-col :span="6" style="text-align: center">
                    <span>{{ item.count*item.data.price }}</span>
                  </el-col>
                  <el-col :span="2" style="text-align: center">
                    <i class="el-icon-delete-solid" style="color: red" @click="removeItem(i)" />
                  </el-col>
                </el-row>
              </div>
              <hr>

              <div>
                <label>Other Charges</label>
                <el-popover
                  v-model="popVisible"
                  placement="right"
                  width="400"
                  trigger="click"
                >
                  <div>
                    <span>Name:</span>
                    <el-input v-model="otherCharge.name" size="mini" />
                    <span>Amount:</span>
                    <el-input v-model="otherCharge.amount" type="number" size="mini" />

                    <el-button type="primary" size="mini" @click="addOtherCharges">OK</el-button>
                  </div>
                  <el-button slot="reference" type="primary" size="mini" icon="el-icon-plus" />
                </el-popover>
                <el-row v-for="(data,i) of otherChargesList" :key="i" style="margin-bottom: 5px">
                  <el-col :span="14">
                    <span>{{ data.name }}</span>
                  </el-col>
                  <el-col :span="6" style="text-align: center">
                    <el-input v-model="data.amount" size="mini" style="width: 60px" />
                  </el-col>
                  <el-col :span="3" style="text-align: left">
                    <i class="el-icon-delete-solid" style="color: red" @click="otherChargeDelete(data)" />
                  </el-col>
                </el-row>
              </div>
              <hr>
              <div>
                <span>Total : </span>
                <span style="float:right;">{{ total }}</span>
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
