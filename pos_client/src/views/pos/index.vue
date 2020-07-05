<template>
  <div class="pos-container">
    <div>
      <el-row :style="{width: device === 'mobile' ? '96%' : '100%'}">
        <div style="height: 100vh;float: left; margin-right: 0px" :style="{width: device === 'mobile' ? '50%' : '50%'}">
          <div style="margin-bottom: 10px; border: 1px solid #f3f0f0; padding: 5px 0; border-radius: 5px;">
            <el-input
              v-model="searchProduct"
              popper-class="my-autocomplete"
              style="width: 65%; padding: 5px 0;"
              size="small"
              value-key="productName"
              placeholder="Search Product"
              clearable
              @input="productAutoCompleteSearch"
            >
              <!-- <template slot-scope="{ item }">
                <div class="name">{{ item.productName }}</div>
                <span class="phone">{{ item.supplierName }}&nbsp;&nbsp;{{ item.unitPrice }}</span>
              </template> -->
              <el-button slot="append" size="small" icon="el-icon-plus" @click="openNewTab('Product')" />
            </el-input>

            <el-autocomplete
              v-model="selectedSupplier"
              popper-class="my-autocomplete"
              :fetch-suggestions="querySearchAsync"
              placeholder="Search Supplier"
              style="width: 30%;padding: 5px 0;"
              clearable
              size="small"
              @clear="handleSupplierClear"
              @select="handleSelectSupplier"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.name }}</div>
                <span class="phone">{{ item.phone }}&nbsp;&nbsp;{{ item.addressOne }}</span>
              </template>
            </el-autocomplete>

            <el-autocomplete v-model="searchCategory" style="width: 200px" size="small" value-key="categoryName" clearable :fetch-suggestions="categorySearch" placeholder="Search Category" class="input-with-select" @select="searchClick" />
            <el-button size="small" icon="el-icon-search" @click="searchClick" />
          </div>

          <div style="overflow-y: scroll;height: 80vh">
            <el-card v-for="(item,i) in itemList" :key="i" shadow="hover" :body-style="{ padding: '0px' }" style="width: 200px; height: 150px; float: left; margin: 5px; cursor: grab">
              <div style="text-align: center" @click="popShow(item)">
                <el-image v-if="item.imgPath !== ''" :src="baseUrl+item.imgPath" fit="fill" style="height: 100px; width: 100px" />
                <el-image v-if="item.imgPath === ''" :src="baseUrl+'/shared/company_profile.jpg'" fit="fill" style="height: 90px; width: 100px" />
                <div style="text-align: center; padding: 3px; background: #f1f1f1; font-size: 12px; height: 150px">
                  <span style="overflow-wrap: break-word;">{{ item.productName }}</span><br>
                  <span>{{ item.supplierName }}</span>
                </div>
              </div>
            </el-card>
          </div>

          <el-dialog
            :visible.sync="noStockdialogVisible"
            width="25%"
            style="overflow-wrap: break-word;"
          >
            <el-row>
              <span>These stock is soldOut. Please purchase stock.</span>
            </el-row>
            <span slot="footer" class="dialog-footer">
              <!-- <el-button size="small" type="primary" @click="addSaleItem">Confirm</el-button>
              <el-button size="small" @click="dialogVisible = false">Cancel</el-button> -->
            </span>
          </el-dialog>

          <el-dialog
            :visible.sync="dialogVisible"
            :title="selectedItem.productName"
            width="25%"
            style="overflow-wrap: break-word;"
          >
            <el-row>
              <el-card v-for="(item,i) in selectedItem.unit" :key="i" shadow="hover" :body-style="{ padding: '0px' }" style="width: 150px; height: 85px; float: left; margin: 5px; cursor: grab; border: 2px solid #cedae2;">
                <div style="text-align: center" @click="addSaleItem(item,selectedItem.productQty)">
                  <div style="text-align: center; padding: 5px; background: #f1f1f1; font-size: 14px; height: 30px">
                    <span style="overflow-wrap: break-word;">{{ item.unitName }}</span>
                  </div>
                  <br>
                  <div @click.stop="setFocus('price')">
                    <el-input ref="price" v-model="item.sellPrice" style="width: 50%" size="mini" />MMK
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
        <div style="overflow-y: auto; height: 100vh;" :style="{width: device==='mobile' ? '50%' : '50%'}">
          <div>
            <el-card shadow="hover" class="box-card" style="bottom: 0px; color: #928585;font-family: initial">
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
                  style="width : 90%"
                  clearable
                  @clear="clearCustomer"
                  @select="handleSelectCustomer"
                >
                  <template slot="prepend"><span class="el-icon-user" /></template>
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.name }}</div>
                    <span class="phone">{{ item.city }}&nbsp;&nbsp;{{ item.phone }}</span>
                  </template>
                  <el-button slot="append" icon="el-icon-circle-plus-outline" @click="customerCreateVisible = true" />
                </el-autocomplete>
              </div>
              <br>
              <div style="margin: 0px; min-height: 200px">
                <el-row>
                  <el-col :span="1" style="text-align: center"><span>#</span></el-col>
                  <el-col :span="6" style="text-align: center"><span>Name</span></el-col>
                  <el-col :span="4" style="text-align: center"><span>Unit Price</span></el-col>
                  <el-col :span="6" style="text-align: center"><span>Qty</span></el-col>
                  <el-col :span="6" style="text-align: center"><span>Total</span></el-col>
                  <el-col :span="1" />
                </el-row>
                <hr>
                <el-row v-for="(item,i) of selectedItemList" :key="i" slot="reference" style="margin-bottom: 5px;line-height: 25px; cursor: pointer">
                  <el-col :span="1" style="text-align: center; color: #000000"><span>{{ i+1 }}.</span></el-col>
                  <el-col :span="7"><div style="overflow-wrap: break-word;"> {{ item.productName }}&nbsp;({{ item.unitName }} )</div></el-col>
                  <el-col :span="3" style="text-align: center">
                    <input v-model="item.realSellPrice" type="number" style="padding: 2px;width: 100%;height: 28px;line-height: 28px;" size="mini" min="0" @input="setTotal">
                  </el-col>
                  <el-col :span="6" style="text-align: center">
                    <el-row>
                      <span size="mini" class="el-icon-remove" :style="{fontSize: device==='mobile'? '18px' : '25px'}" style="font-size: 25px; color: #8a7443; cursor: pointer;" @click.stop="item.qty = item.qty==1 || item.qty <= 0 ? removeItem(i) : item.qty-1, setTotal()" />
                      <input v-model="item.qty" :style="{width: device==='mobile'? '21px' : '69px'}" style="text-align: center; border: none;font-size: 18px;" type="number" @change="checkQty(item.qty,item.totalQty)? item.qty=item.totalQty:item.qty=item.qty, item.qty == 0 ? removeItem(i) : '', setTotal()">
                      <span size="mini" class="el-icon-circle-plus" :style="{fontSize: device==='mobile'? '18px' : '25px'}" style="font-size: 25px;color: #73c715 cursor: pointer;" @click.stop="checkQty(item.qty+1, item.totalQty)? item.qty=item.qty-1:item.qty=item.qty, item.qty++, setTotal()" />

                    </el-row>

                  </el-col>
                  <el-col :span="6" style="text-align: center">
                    <span>{{ item.qty * parseFloat(item.realSellPrice)-(item.qty * parseFloat(item.realSellPrice) * (item.discount / 100)) }}</span>
                  </el-col>
                  <el-col :span="1" style="text-align: center">
                    <i class="el-icon-delete-solid" style="color: red; cursor: pointer;" @click="removeItem(i), setTotal()" />
                  </el-col>
                </el-row>
                <!-- </el-popover> -->

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
                  <el-button slot="reference" type="primary" size="mini" icon="el-icon-plus" circle />
                </el-popover>
                <el-row v-for="(data,i) of otherChargesList" :key="i" style="margin-bottom: 5px">
                  <el-col :span="14">
                    <span>{{ data.name }}</span>
                  </el-col>
                  <el-col :span="6" style="text-align: center">
                    <el-input v-model="data.amount" type="number" size="mini" style="width: 100px" min="0" /> MMK
                  </el-col>
                  <el-col :span="3" style="text-align: right">
                    <i class="el-icon-delete-solid" style="color: red" @click="otherChargeDelete(data)" />
                  </el-col>
                </el-row>
              </div>
              <hr>
              <div>
                <span>Sub Total : </span>
                <span style="float:right;">{{ total }}</span>
              </div>
              <div>
                <span>Other Total : </span>
                <span style="float:right;">{{ OtherChargeTotal }}</span>
              </div>
              <hr>
              <el-popover
                title="Discount"
                width="200"
                trigger="click"
                content="this is content, this is content, this is content"
              >
                <div>
                  <el-input v-model="discount" type="number" size="mini" min="0" />
                </div>
                <div slot="reference" style="cursor: pointer">
                  <span>Discount on entire sale :
                  </span>
                  <i class="el-icon-edit-outline" style="cursor:pointer" />
                  <span style="float:right;">{{ discount }}</span>
                </div>
              </el-popover>

              <div style="cursor: pointer">
                <span>Tax :
                </span>
                <span style="float:right;">{{ tax.toFixed(2) }} </span>
              </div>

              <hr>
              <div style="line-height: 30px; height: 30px">
                <label>Product Price Tax</label>
                <span style="float: right">
                  <el-button size="mini" :type="!taxInclude? 'info': ''" round @click="taxInclude=false, setTotal()">No Tax</el-button>
                  <el-button size="mini" :type="taxInclude? 'info': ''" round @click="taxInclude=true, setTotal()">Tax</el-button>
                </span>

              </div>

              <hr>

              <div>
                <span>Total :</span>
                <span style="float:right;">{{ netAmount.toFixed(2) }}</span>
              </div>
              <hr>
              <div>
                <span>Old Credit Amount :</span>
                <span style="float:right;">{{ customerData.oldCreditAmount }}</span>
              </div>
              <hr>
              <div>
                <span>Grand Total :</span>
                <span style="float:right;">{{ (netAmount+customerData.oldCreditAmount).toFixed(2) }}</span>
              </div>
              <hr>
              <div style="height: 30px">
                <label>Pay Amount :
                </label>
                <i class="el-icon-edit-outline" style="cursor:pointer" />
                <span style="float:right;">
                  <el-input v-model="payAmount" type="number" size="mini" min="0" style="width: 200px;" @click="setTotal" /> MMK
                </span>
              </div>
              <div v-if="payAmount >= (netAmount+customerData.oldCreditAmount).toFixed(2) || (payAmount - (netAmount+customerData.oldCreditAmount).toFixed(2)).toFixed(2) == 0.00" style="line-height: 35px">
                <span>Change Amount :</span>
                <span style="float:right;">{{ (payAmount - (netAmount+customerData.oldCreditAmount).toFixed(2)).toFixed(2) }} MMK</span>
              </div>
              <div v-if="payAmount < (netAmount+customerData.oldCreditAmount).toFixed(2) && ((netAmount+customerData.oldCreditAmount).toFixed(2) - payAmount).toFixed(2) > 0.00" style="line-height: 35px">
                <span>Credit Amount :</span>
                (Due Date:
                <el-date-picker
                  v-model="dueDate"
                  type="date"
                  placeholder="Pick a day"
                  size="mini"
                  style="width: 150px"
                />)
                <span style="float:right;">{{ (netAmount+customerData.oldCreditAmount - payAmount).toFixed(2) }} MMK</span>
              </div>
              <hr>

              <div style="text-align: right">
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Are you sure to delete this?"
                  @onConfirm="clearItemList"
                >
                  <el-button slot="reference" type="danger">Cancel</el-button>
                </el-popconfirm>
                <el-button type="primary" @click="payNow">Pay Now</el-button>
                <el-button type="primary" @click="order">Order</el-button>
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
      :visible.sync="printPay"
    >
      <div id="printMe">
        <div id="saleHeader" style="text-align:center; padding: 25px">
          <h3>Sale</h3>
          <div>Sale Receipt</div>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left"> Invoice Id : {{ printSaleVaule.receiptNo }}</span>
            <span style="float: right">Date : {{ today.split(',')[0] }}</span>
          </div><br>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">Sold To : {{ printSaleVaule.customerName }} </span>
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
                <th style="width: 20%; text-align:right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) of printSaleVaule.soldItemsList" id="trh" :key="i" style="text-align:center;border-bottom: 1px solid #dddddd;">
                <td style="text-align: left">{{ item.productName }}({{ item.unitName }})</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.realSellPrice }} MMK</td>
                <td style="text-align:right">{{ (item.qty * parseFloat(item.realSellPrice) - (item.qty * parseFloat(item.realSellPrice)* (item.discount/100))).toFixed(2) }} MMK</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td style="color: #000000b5;font-weight: bolder;">Other Charges : </td>
                <td colspan="4">
                  <div v-for="(data,i) of printSaleVaule.otherChargesList" :key="i">

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
              <span style="float: right">{{ printSaleVaule.discount }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Tax : </span>
              <span style="float: right"><s v-if="!taxInclude">{{ tax.toFixed(2) }} MMK</s> <span v-if="taxInclude">{{ tax.toFixed(2) }} MMK</span></span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Sub Total : </span>
              <span style="float: right">{{ printSaleVaule.subTotal }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Other Total : </span>
              <span style="float: right">{{ printSaleVaule.otherTotal }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Total : </span>
              <span style="float: right">{{ printSaleVaule.total }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Old Credit Amount :</span>
              <span style="float:right;">{{ printSaleVaule.oldCreditAmount }} MMK</span>
            </div>
            <br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Grand Total :</span>
              <span style="float:right;">{{ (printSaleVaule.total+printSaleVaule.oldCreditAmount).toFixed(2) }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Pay Amount : </span>
              <span style="float: right">{{ printSaleVaule.paidAmount }} MMK</span>
            </div><br>
            <div v-if="printSaleVaule.change !== 0.00" style="line-height: 35px; margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Change Amount :</span>
              <span style="float:right;">{{ printSaleVaule.change }} MMK</span>
            </div>
            <div v-if="printSaleVaule.creditAmount !== 0.00" style="line-height: 35px; margin:5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Credit Amount :</span>
              <span style="float:right;">{{ printSaleVaule.creditAmount }} MMK</span>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 25px">
        <el-button size="small" type="danger" style="float: right; margin-left: 10px" @click="printPay = false">Cancel</el-button>
        <el-button size="small" type="primary" style="float: right" @click="printData">Print</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="printOrder"
    >
      <div id="printMe">
        <div id="saleHeader" style="text-align:center; padding: 25px">
          <h3>Sale</h3>
          <div>Sale Order Receipt</div>
          <h4>INVOICE</h4>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left"> Receipt No : {{ printOrderVaule.receiptNo }}</span>
            <span style="float: right">Date : {{ today.split(',')[0] }}</span>
          </div><br>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">Sold To : {{ printOrderVaule.customerName }} </span>
            <span style="float: right">Time : {{ today.split(',')[1] }}</span>
          </div><br>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">Sold By : {{ $store.getters.curUserInfo.username }}</span>
          </div><br>
          <!-- <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">Phone : </span>
          </div><br>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">Address : </span>
          </div><br> -->
        </div>
        <div style="margin: 25px">
          <table style="width: 100%">
            <thead>
              <tr style="text-align:center">
                <th style="width: 30%; text-align: left">Items</th>
                <th style="width: 10%">Qty</th>
                <th style="width: 20%">Price</th>
                <th style="width: 20%; text-align:right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) of printOrderVaule.soldItemsList" id="trh" :key="i" style="text-align:center;border-bottom: 1px solid #dddddd;">
                <td style="text-align: left">{{ item.productName }}({{ item.unitName }})</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.realSellPrice }} MMK</td>
                <td style="text-align:right">{{ (item.qty * parseFloat(item.realSellPrice) - (item.qty * parseFloat(item.realSellPrice)* (item.discount/100))).toFixed(2) }} MMK</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td style="color: #000000b5;font-weight: bolder;">Other Charges : </td>
                <td colspan="4">
                  <div v-for="(data,i) of printOrderVaule.otherChargesList" :key="i">

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
              <span style="float: right">{{ printOrderVaule.discount }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Tax : </span>
              <span style="float: right"><s v-if="!taxInclude">{{ printOrderVaule.tax }} MMK</s> <span v-if="taxInclude">{{ printOrderVaule.tax }} MMK</span></span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Sub Total : </span>
              <span style="float: right">{{ printOrderVaule.subTotal }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Other Total : </span>
              <span style="float: right">{{ printOrderVaule.otherTotal }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Total : </span>
              <span style="float: right">{{ printOrderVaule.total }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Old Credit Amount :</span>
              <span style="float:right;">{{ printOrderVaule.oldCreditAmount }} MMK</span>
            </div>
            <br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Grand Total :</span>
              <span style="float:right;">{{ (printOrderVaule.total+printOrderVaule.oldCreditAmount).toFixed(2) }} MMK</span>
            </div><br>
            <!-- <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Pay Amount : </span>
              <span style="float: right">{{ printOrderVaule.payAmount }} MMK</span>
            </div><br>
            <div style="margin: 5px">
              <span style="color: #000000b5;font-weight: bolder; float: left">Left Amount : </span>
              <span style="float: right">{{ (printOrderVaule.total-printOrderVaule.payAmount).toFixed(2) }} MMK</span>
            </div><br> -->
          </div>
        </div>
      </div>
      <div style="height: 25px">
        <el-button size="small" type="danger" style="float: right; margin-left: 10px" @click="printOrder = false">Cancel</el-button>
        <el-button size="small" type="primary" style="float: right" @click="printOrderData">Print Order</el-button>
      </div>
    </el-dialog>
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
/* #trh td{
   border-bottom: 1px solid #dddddd;
    padding: 8px;
} */
   table,
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #d8b7b7;
        border-top: 1px solid #d8b7b7;
        border-collapse: collapse;
      }

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
  .pos-container{
    margin: 15px;
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

  .my-autocomplete li {
    /* li { */
      line-height: normal;
      padding: 7px;
  }

hr {
    height: 1px;
    overflow: visible;
    border: none;
    background: #dad2d2;
}

  .my-autocomplete li .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
  .my-autocomplete li .phone {
        font-size: 12px;
        color: #b4b4b4;
  }

</style>
