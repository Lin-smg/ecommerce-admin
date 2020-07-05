<template>
  <div class="purchase-container">
    <div>
      <el-row :style="{width: device === 'mobile' ? '96%' : '100%'}">
        <div style="height: 100vh;float: left; margin-right: 0px" :style="{width: device === 'mobile' ? '30%' : '25%'}">
          <div style="margin-bottom: 10px; border: 1px solid #f3f0f0; padding: 5px 0; border-radius: 5px;">
            <el-input
              v-model="searchProduct"
              popper-class="my-autocomplete"
              style="width: 100%; padding: 5px 0;"
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
              style="width: 48%;padding: 5px 0;"
              clearable
              size="small"
              @clear="handleClear"
              @select="handleSelectSupplier"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.name }}</div>
                <span class="phone">{{ item.phone }}&nbsp;&nbsp;{{ item.addressOne }}</span>
              </template>
            </el-autocomplete>

            <el-autocomplete v-model="searchCategory" style="width: 35%" size="small" value-key="categoryName" clearable :fetch-suggestions="categorySearch" placeholder="Search Category" class="input-with-select" @select="searchClick" />
            <el-button size="small" icon="el-icon-search" @click="searchClick" />
          </div>

          <div style="overflow-y: scroll;height: 80vh;padding:5px">
            <el-table
              :data="itemList"
              border
              style="width: 100%;background-color: #e9e3e3"
              highlight-current-row
              size="small"
            >
              <el-table-column header-align="center" align="left">
                <template slot="header">
                  <span>Name</span>
                </template>
                <template slot-scope="{row}">
                  <div>{{ row.productName }}</div>
                  <span class="psupplier">{{ row.supplierName }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="60">
                <template slot="header">
                  <span>#</span>
                </template>
                <template slot-scope="{row}">
                  <i slot="append" style="font-size: 30px" class="el-icon-circle-plus" @click="popShow(row)" />
                </template>
              </el-table-column>
            </el-table>
          </div>

          <el-dialog
            :visible.sync="dialogVisible"
            :title="selectedItem.productName"
            width="25%"
            style="overflow-wrap: break-word;"
          >
            <el-row>
              <el-card v-for="(item,i) in selectedItem.unit" :key="i" shadow="hover" :body-style="{ padding: '0px' }" style="width: 150px; height: 85px; float: left; margin: 5px; cursor: grab; border: 2px solid #cedae2;">
                <div style="text-align: center" @click="setPurchaseItem(item)">
                  <div style="text-align: center; padding: 5px; background: #f1f1f1; font-size: 14px; height: 30px">
                    <span style="overflow-wrap: break-word;">{{ item.unitName }}</span>
                  </div>
                  <br>
                  <div @click.stop="setFocus('price')">
                    <el-input ref="price" v-model="item.unitCost" :disabled="true" style="width: 50%" size="mini" />MMK
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
        <div
          style="overflow-y: auto; height: 100vh; float: right;"
          :style="{width: device==='mobile' ? '70%' : '75%'}"
        >
          <div>
            <el-card shadow="hover" class="box-card" style="bottom: 0px;font-size: 13px">
              <div ref="header">
                <el-autocomplete
                  v-model="supplier"
                  popper-class="my-autocomplete"
                  size="small"
                  value-key="name"
                  class="inline-input"
                  clearable
                  :fetch-suggestions="supplierSearch"
                  :highlight-first-item="true"
                  placeholder="Please Input"
                  :style="{width: device === 'mobile' ? '100%' : '60%'}"
                  @clear="handleClearFromSupplier"
                  @select="handleSelectFromSupplier"
                >
                  <template slot="prepend">
                    <span class="el-icon-user" />
                  </template>
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.name }}</div>
                    <span class="phone">{{ item.phone }}&nbsp;&nbsp;{{ item.addressOne }}</span>
                  </template>
                  <el-button
                    slot="append"
                    icon="el-icon-circle-plus-outline"
                    @click="supplierCreateFormShow"
                  />
                </el-autocomplete>
              </div>
              <br>
              <div style="margin: 0px; min-height: 200px">
                <el-row>
                  <el-col :span="1" style="text-align: center"><span>#</span></el-col>
                  <el-col :span="3" style="text-align: center"><span>Name</span></el-col>
                  <el-col :span="2" style="text-align: center"><span>Sell Price</span></el-col>
                  <el-col :span="3" style="text-align: center"><span>Exp Date</span></el-col>
                  <el-col :span="3" style="text-align: center"><span>Unit</span></el-col>
                  <el-col :span="2" style="text-align: center"><span>Cost</span></el-col>
                  <el-col :span="3" style="text-align: center"><span>Qty</span></el-col>
                  <el-col :span="3" style="text-align: center"><span>Total</span></el-col>
                  <el-col :span="1" style="text-align: center"><span>Promo</span></el-col>
                  <el-col :span="3" />
                </el-row>
                <hr>
                <el-row v-for="(item,i) of selectedItemList" :key="i" slot="reference" style="margin-bottom: 5px;line-height: 25px; cursor: pointer">
                  <el-col :span="1" style="text-align: center; color: #000000"><span>{{ i+1 }}.</span></el-col>
                  <el-col :span="3"><span style="word-break: break-all;">{{ item.productName }}</span></el-col>
                  <el-col :span="2" style="text-align: center">
                    <input v-model="item.sellPrice" type="number" style="padding: 2px;width: 100%;height: 28px;line-height: 28px;" size="mini" min="0">
                  </el-col>
                  <el-col :span="3" style="text-align: center">
                    <el-date-picker v-model="item.expDate" type="date" format="yyyy-MM-dd" style="padding: 2px;width: 130px;" size="mini" />
                  </el-col>
                  <el-col :span="3" style="text-align: center">
                    <span style="overflow-wrap: break-word;">{{ item.unitName }}</span>
                  </el-col>
                  <el-col :span="2" style="text-align: center">
                    <input v-model="item.unitCost" type="number" style="padding: 2px;width: 100%;height: 28px;line-height: 28px;" size="mini" min="0" @input="setTotal">
                  </el-col>
                  <el-col :span="4" style="text-align: center;padding: 2px;">
                    <el-row>
                      <span size="mini" class="el-icon-remove" :style="{fontSize: device==='mobile'? '18px' : '25px'}" style="font-size: 25px; color: #8a7443; cursor: pointer;" @click.stop="item.qty = item.qty==1 || item.qty <= 0 ? removeItem(i) : item.qty-1, setTotal()" />
                      <input v-model="item.qty" :style="{width: device==='mobile'? '21px' : '70px'}" style="text-align: center; border: none;font-size: 18px;" type="number" @input="setTotal" @change="item.qty == 0 ? removeItem(i) : '', setTotal">
                      <span size="mini" class="el-icon-circle-plus" :style="{fontSize: device==='mobile'? '18px' : '25px'}" style="font-size: 25px;color: #73c715 cursor: pointer;" @click.stop="item.qty++, setTotal()" />

                    </el-row>

                  </el-col>
                  <el-col :span="2" style="text-align: center">
                    <span>{{ (item.qty * parseFloat(item.unitCost))?item.qty * parseFloat(item.unitCost): 0 }}</span>
                  </el-col>
                  <el-col :span="1" style="text-align: center;padding: 2px;">
                    <input v-model="item.promoQty" style="padding: 2px;width:40px;" type="number" size="mini" min="0">
                  </el-col>
                  <el-col :span="3" style="text-align: center">
                    <span>

                      <el-tooltip :content="item.promoStatus? 'Promo Received' : 'Promo Not Received'" placement="top">
                        <el-switch
                          v-model="item.promoStatus"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          @click="handleModifyStatus(item, item.promoStatus)"
                        />
                      </el-tooltip>

                      <!-- <el-button v-if="item.promoStatus===true" size="mini" type="success" @click="handleModifyStatus(item, item.promoStatus)">
                        Publish
                      </el-button>
                      <el-button v-if="item.promoStatus===false" size="mini" @click="handleModifyStatus(item, item.promoStatus)">
                        Draft
                      </el-button> -->
                     &nbsp;
                      <i class="el-icon-delete-solid" style="font-size:20px;color: red; cursor: pointer;" @click="removeItem(i), setTotal()" />
                     &nbsp;
                      <i class="el-icon-s-home" style="font-size:20px;color: red; cursor: pointer;" @click="showWarehouse(item), setTotal()" />
                    </span>
                  </el-col>
                </el-row>
              </div>
              <hr>
              <div>
                <span style="font-size: 20px;">Total :</span>
                <span style="float:right;">{{ total.toFixed(2) }}</span>
              </div>

              <hr>
              <div style="text-align: right">
                <el-button type="primary" @click="savePurchase">Save</el-button>
              </div>
            </el-card>
          </div>
        </div>
      </el-row>
    </div>

    <el-dialog title="Supplier" :visible.sync="supplierCreateVisible">
      <el-form ref="suppliersCreateForm" :model="suppliersCreateForm" :rules="supplierRule" label-width="220px" style="width: 500px">
        <el-form-item label="Name :" prop="name">
          <el-input v-model="suppliersCreateForm.name" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="E-Mail :" prop="email">
          <el-input v-model="suppliersCreateForm.email" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Phone Number :" prop="phone">
          <el-input v-model="suppliersCreateForm.phone" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Address 1 :" prop="addressOne">
          <el-input v-model="suppliersCreateForm.addressOne" type="textarea" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Address 2 :" prop="addressTwo">
          <el-input v-model="suppliersCreateForm.addressTwo" type="textarea" autocomplete="off" />
        </el-form-item>

        <el-form-item label="City :" prop="city">
          <el-input v-model="suppliersCreateForm.city" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="State/Province :" prop="stateOrProvince">
          <el-input v-model="suppliersCreateForm.stateOrProvince" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Zip :" prop="zipCode">
          <el-input v-model="suppliersCreateForm.zipCode" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Country :" prop="country">
          <el-input v-model="suppliersCreateForm.country" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Comments :" prop="comments">
          <el-input v-model="suppliersCreateForm.comments" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Internal Notes :" prop="internalNotes">
          <el-input v-model="suppliersCreateForm.internalNotes" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Company Name :" prop="companyName">
          <el-input v-model="suppliersCreateForm.companyName" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Account # :" prop="account">
          <el-input v-model="suppliersCreateForm.account" type="text" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="createSupplier">Create</el-button>
          <el-button @click="clearSupplierForm">Cancel</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      :visible.sync="print"
      width="80%"
    >
      <div id="printMe">
        <div id="saleHeader" style="text-align:center; padding: 25px">
          <h3>Purchase</h3>
          <h4>INVOICE</h4>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">Invoice No : {{ printInvoiceData.invoiceNo }}</span>
            <span style="float: right">Date : {{ today.split(',')[0] }}</span>
          </div>
          <br>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">From : {{ printInvoiceData.supplierName }} </span>
            <span style="float: right">Time : {{ today.split(',')[1] }}</span>
          </div>
          <br>
          <div style="margin: 5px; color: #000000; font-weight: 600">
            <span style="float: left">Save By : {{ $store.getters.curUserInfo.username }}</span>
          </div>
          <br>
          <div style="margin: 25px">
            <table style="width: 100%">
              <thead>
                <tr style="text-align:center">
                  <th style="width: 1%;">#</th>
                  <th style="width: 30%; text-align: left">Items</th>
                  <th style="width: 15%;">Unit Cost</th>
                  <th style="width: 10%">Qty</th>
                  <th style="width: 16%">Total</th>
                  <th style="width: 18%">Promo-Qty</th>
                  <th style="width: 10%">Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,i) of printInvoiceData.purchaseItemsList"
                  id="trh"
                  :key="i"
                  style="text-align:center;border-bottom: 1px solid #dddddd;"
                >
                  <td>{{ i+1 }}</td>
                  <td style="text-align: left">{{ item.productName }}({{ item.unitName }})</td>
                  <td>{{ item.unitCost }} MMK</td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.unitCost * item.qty }} MMK</td>
                  <td>{{ item.promoQty }}</td>
                  <td>{{ item.promoStatus? '**promo**' : '' }}</td>
                </tr>
              </tbody>
            </table>
            <div id="footer" style="padding: 10px">
              <div style="margin: 5px">
                <span style="color: #000000b5;font-weight: bolder; float: left">Total :</span>
                <span style="float: right">{{ total }} MMK</span>
              </div>
              <br>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 25px">
        <el-button type="primary" style="float: right" @click="printData">Print</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Warehouse" :visible.sync="warehouseListVisible">
      <div>
        <el-row v-for="(warehouse,i) of warehouseList" :key="i" style="margin: 5px; line-height: 35px">
          <el-col :span="5" style="width: 40%">
            <span>{{ warehouse.wareHouseName }}</span>
          </el-col>
          <el-col :span="10">
            <el-input v-model="warehouse.qty" style="width: 60%" type="number" /> Qty
          </el-col>
        </el-row>
      </div>
      <div style="height: 25px">
        <el-button type="danger" style="float: right" @click="warehouseListVisible=false">Cancel</el-button>
        <el-button type="primary" style="float: right; margin-right: 10px" @click="saveWarehouse">Save</el-button>
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
  margin: 10px;
}

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
  .psupplier {
     font-size: 12px;
        color: #b4b4b4;
  }
</style>
