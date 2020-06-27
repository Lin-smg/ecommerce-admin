<template>
  <div class="purchase-container">
    <div>
      <el-row :gutter="20" style="position: absolute;" :style="{width: device === 'mobile' ? '96%' : '100%'}">
        <div style="height: 100vh;float: left; margin-right: 8px" :style="{width: device === 'mobile' ? '53%' : '60%'}">
          <div style="margin-bottom: 10px; border: 1px solid #f3f0f0; padding: 5px; border-radius: 5px">
            <el-autocomplete
              v-model="searchProduct"
              style="margin: 2px"
              size="small"
              value-key="productName"
              :fetch-suggestions="productSearch"
              placeholder="Search Product"
              @select="searchClick"
            />
            <el-autocomplete v-model="searchCategory" style="margin: 2px" size="small" value-key="categoryName" :fetch-suggestions="categorySearch" placeholder="Search Category" class="input-with-select" @select="searchClick" />
            <el-autocomplete v-model="searchBrand" style="margin: 2px" size="small" value-key="brandName" :fetch-suggestions="brandSearch" placeholder="Search Brand" class="input-with-select" @select="searchClick" />
            <el-button size="small" icon="el-icon-search" @click="searchClick" />

          </div>

          <div style="overflow-y: scroll;height: 80vh">
            <el-card v-for="(item,i) in itemList" :key="i" shadow="hover" :body-style="{ padding: '0px' }" style="width: 140px; height: 135px; float: left; margin: 5px; cursor: grab">
              <div style="text-align: center" @click="popShow(item)">
                <el-image v-if="item.imgPath !== ''" :src="baseUrl+item.imgPath" fit="fill" style="height: 90px; width: 100px" />
                <!-- src="https://graphicriver.img.customer.envatousercontent.com/files/264957949/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=2d1cf4f57526765a35de39bf26286c4e" -->
                <div style="text-align: center; padding: 5px; background: #f1f1f1; font-size: 14px">
                  <span>{{ item.productName }}</span><br>
                  <span> {{ item.type }} {{ item.taxPercent }} </span><br>
                  <!-- <span> {{ item.price }} Kyats</span> -->
                </div>
              </div>
            </el-card>
          </div>

          <el-dialog
            :visible.sync="dialogVisible"
            :title="selectedItem.productName"
          >
            <el-row>
              <el-card v-for="(item,i) in selectedItem.unit" :key="i" shadow="hover" :body-style="{ padding: '0px' }" style="width: 150px; height: 85px; float: left; margin: 5px; cursor: grab; border: 2px solid #cedae2;">
                <div style="text-align: center">
                  <!-- <el-image fit="fill" style="height: 90px; width: 100px" src="https://graphicriver.img.customer.envatousercontent.com/files/264957949/preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&w=590&h=590&s=2d1cf4f57526765a35de39bf26286c4e" /> -->
                  <div style="text-align: center; padding: 5px; background: #f1f1f1; font-size: 14px; height: 30px" @click="addSaleItem(item)">
                    <span>{{ item.unitName }}</span>
                  </div>
                  <br>
                  <div>
                    <el-input v-model="item.sellPrice" style="width: 50%" size="mini" />MMK
                  </div>
                </div>
              </el-card>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <!-- <el-button size="small" type="primary" @click="addSaleItem">Confirm</el-button>
              <el-button size="small" @click="dialogVisible = false">Cancel</el-button> -->
            </span>
          </el-dialog>

        </div>
        <div style="overflow-y: auto; height: 100vh; float: right;" :style="{width: device==='mobile' ? '45%' : '500px'}">
          <div>
            <el-card shadow="hover" class="box-card" style="bottom: 0px">
              <div ref="header">
                <el-autocomplete
                  v-model="customer"
                  popper-class="my-autocomplete"
                  size="small"
                  value-key="name"
                  class="inline-input"
                  :fetch-suggestions="customerSearch"
                  :highlight-first-item="true"
                  placeholder="Please Input"
                  @select="handleSelect"
                >
                  <template slot="prepend"><span class="el-icon-user" /></template>
                  <template slot-scope="{ item }" style="line-height: normal">
                    <div class="value">{{ item.name }} ( {{ item.phone }} )</div>
                    <!-- <span class="link" style="margin-top: -10px">{{ item.name }}</span> -->
                  </template>
                </el-autocomplete>
                <el-button type="primary" size="small" class="el-icon-plus" @click="customerCreateVisible = true" />
              </div>

              <div style="margin: 10px; min-height: 200px">
                <el-row>
                  <el-col :span="10" style="text-align: center"><span>Name</span></el-col>
                  <el-col :span="6" style="text-align: center"><span>Qty</span></el-col>
                  <el-col :span="6" style="text-align: center"><span>Price</span></el-col>
                  <el-col :span="2" />
                </el-row>
                <hr>

                <el-row v-for="(item,i) of selectedItemList" :key="i" style="margin-bottom: 5px;line-height: 25px">
                  <el-col :span="10"><div>{{ item.data.productName }}({{ item.data.unitName }})</div></el-col>
                  <el-col :span="6" style="text-align: center">
                    <el-row>
                      <span size="mini" class="el-icon-remove" :style="{fontSize: device==='mobile'? '18px' : '25px'}" style="font-size: 25px; color: #8a7443; cursor: pointer;" @click="item.count = item.count==1 || item.count <= 0 ? removeItem(i) : item.count-1, setTotal()" />
                      <input v-model="item.count" :style="{width: device==='mobile'? '21px' : '25px'}" style="width: 25px; text-align: center; border: none" type="number" @change="item.count == 0 ? removeItem(i) : '', setTotal()">
                      <span size="mini" class="el-icon-circle-plus" :style="{fontSize: device==='mobile'? '18px' : '25px'}" style="font-size: 25px;color: #73c715 cursor: pointer;" @click="item.count++, setTotal()" />

                    </el-row>

                  </el-col>
                  <el-col :span="6" style="text-align: center">
                    <span>{{ ((item.count * parseFloat(item.data.sellPrice)) + (item.count * parseFloat(item.data.sellPrice) * (item.tax/100))).toFixed(2) }}</span>
                  </el-col>
                  <el-col :span="2" style="text-align: center">
                    <i class="el-icon-delete-solid" style="color: red; cursor: pointer;" @click="removeItem(i), setTotal()" />
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
                    <el-input v-model="otherCharge.amount" type="number" size="mini" min="0" />

                    <el-button type="primary" size="mini" style="margin-top: 10px" @click="addOtherCharges">OK</el-button>
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
                  <el-col :span="3" style="text-align: right">
                    <i class="el-icon-delete-solid" style="color: red" @click="otherChargeDelete(data)" />
                  </el-col>
                </el-row>
              </div>
              <hr>
              <div>
                <span>Total : </span>
                <span style="float:right;">{{ total }}</span>
              </div>
              <div>
                <span>Other Total : </span>
                <span style="float:right;">{{ OtherChargeTotal }}</span>
              </div>
              <hr>
              <div>
                <span>Discount :
                  <el-popover
                    placement="top"
                    title="Discount"
                    width="200"
                    trigger="click"
                    content="this is content, this is content, this is content"
                  >
                    <div>
                      <el-input v-model="discount" type="number" size="mini" min="0" />
                    </div>
                    <i slot="reference" class="el-icon-edit-outline" style="cursor:pointer" />
                  </el-popover>
                </span>
                <span style="float:right;">{{ discount }}</span>
              </div>
              <div>
                <span>Tax :
                  <el-popover
                    placement="top"
                    title="Tax"
                    width="200"
                    trigger="click"
                    content="this is content, this is content, this is content"
                  >
                    <div>
                      <el-input v-model="tax" type="number" size="mini" min="0" max="100">
                        <template slot="append">%</template>
                      </el-input>
                    </div>
                    <i slot="reference" class="el-icon-edit-outline" style="cursor:pointer" />
                  </el-popover>
                </span>
                <span style="float:right;">{{ tax }} %</span>
              </div>
              <!-- <div>
                <span>FOC/Other :</span>
                <span style="float:right;">0</span>
              </div> -->

              <hr>

              <div>
                <span>Net Ammount :</span>
                <span style="float:right;">{{ (total+OtherChargeTotal) + (total+OtherChargeTotal)*(tax/100)- discount }}</span>
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
                <el-button type="primary" @click="printClick">Pay Now</el-button>
                <el-button type="primary">Pending</el-button>
              </div>

            </el-card>
          </div>
        </div>
      </el-row>
    </div>

    <el-dialog
      title="Tips"
      :visible.sync="customerCreateVisible"
    >

      <el-form ref="createForm" label-width="220px" style="width: 500px">
        <el-form-item label="Name :" prop="name">
          <el-input v-model="customersCreateForm.name" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="E-Mail :" prop="email">
          <el-input v-model="customersCreateForm.email" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Phone Number :" prop="phone">
          <el-input v-model="customersCreateForm.phone" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Address 1 :" prop="addressOne">
          <el-input v-model="customersCreateForm.addressOne" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Address 2 :" prop="addressTwo">
          <el-input v-model="customersCreateForm.addressTwo" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="City :" prop="city">
          <el-input v-model="customersCreateForm.city" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="State/Province :" prop="stateOrProvince">
          <el-input v-model="customersCreateForm.stateOrProvince" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Zip :" prop="zipCode">
          <el-input v-model="customersCreateForm.zipCode" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Country :" prop="country">
          <el-input v-model="customersCreateForm.country" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Comments :" prop="comments">
          <el-input v-model="customersCreateForm.comments" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Internal Notes :" prop="internalNotes">
          <el-input v-model="customersCreateForm.internalNotes" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Company Name :" prop="companyName">
          <el-input v-model="customersCreateForm.companyName" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Account # :" prop="account">
          <el-input v-model="customersCreateForm.account" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="createCustomer">Create</el-button>
          <el-button @click="resetCreateCustomersForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :visible.sync="print"
    >
      <div id="printMe">
        <div id="saleHeader" style="text-align:center; padding: 25px">
          <h3>Sale</h3>
          <div>Sale Receipt</div>
          <h4>INVOICE</h4>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left"> Invoice Id : {{ Date.now() }}</span>
            <span style="float: right">Date : {{ today.split(',')[0] }}</span>
          </div><br>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">Sold To : {{ customer }} </span>
            <span style="float: right">Time : {{ today.split(',')[1] }}</span>
          </div><br>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">Sold By : {{ $store.getters.curUserInfo.username }}</span>
          </div><br>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">Phone : </span>
          </div><br>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">Address : </span>
          </div><br>
        </div>
        <div style="margin: 25px">
          <table style="width: 100%">
            <thead>
              <tr style="text-align:center">
                <th style="width: 30%; text-align: left">Items</th>
                <th style="width: 10%">Qty</th>
                <th style="width: 20%">Price</th>
                <th style="width: 20%">Discount</th>
                <th style="width: 20%; text-align:right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) of selectedItemList" id="trh" :key="i" style="text-align:center;border-bottom: 1px solid #dddddd;">
                <td style="text-align: left">{{ item.data.productName }}({{ item.data.unitName }})</td>
                <td>{{ item.count }}</td>
                <td>{{ item.data.sellPrice }} MMK</td>
                <td>{{ tax }}%</td>
                <td style="text-align:right">{{ ((item.count * parseFloat(item.data.sellPrice)) + (item.count * parseFloat(item.data.sellPrice) * (item.tax/100))).toFixed(2) }} MMK</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td style="color: #000000b5;font-weight: bolder;">Other Charges : </td>
                <td colspan="4">
                  <div v-for="(data,i) of otherChargesList" :key="i">

                    <span>{{ data.name }} : </span>

                    <span> {{ data.amount }} MMK</span>
                  </div>
                </td>
              </tr>

            </tfoot>
          </table>
          <div id="footer" style="padding: 10px">
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Discount : </span>
              <span style="float: right">{{ discount }} </span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Tax : </span>
              <span style="float: right">{{ tax }} %</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Sub Total : </span>
              <span style="float: right">{{ total }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Other Total : </span>
              <span style="float: right">{{ OtherChargeTotal }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Grand Total : </span>
              <span style="float: right">{{ (total+OtherChargeTotal) + (total+OtherChargeTotal)*(tax/100)- discount }} MMK</span>
            </div><br>
          </div>
        </div>
      </div>
      <div style="height: 25px">
        <el-button type="primary" style="float: right" @click="printData">Print</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Purchase } from '../../mixinsFile/purchase'

export default {
  name: 'Index',
  mixins: [Purchase]
}
</script>

<style scoped>
.purchase-container {
    margin: 10px
}
</style>
