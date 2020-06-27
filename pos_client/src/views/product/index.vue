<template>
  <div class="product-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTab(activeName)">
      <el-tab-pane label="All Products" name="view">
        <div>
          <el-input v-model="searchValue" placeholder="Please input" style="width: 300px; float: right">
            <el-button slot="append" icon="el-icon-search" @click="searchClick" />
          </el-input>
        </div>
        <div>
          <el-table
            border
            :data="productData"
            style="width: 100%;background-color: #e9e3e3"
            highlight-current-row
          >
            <el-table-column align="center" min-width="90">
              <template slot="header">
                <span>Image</span>
              </template>
              <template slot-scope="{row}">
                <img v-if="row.imgPath !== ''" :src="baseUrl+row.imgPath" class="img-container" alt="Photo">
                <img v-if="row.imgPath === ''" :src="baseUrl+'/shared/company_profile.jpg'" class="img-container" alt="Photo">
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="200px">
              <template slot="header">
                <span>product Code</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.productCode }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="250px">
              <template slot="header">
                <span>product name</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.productName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="150px">
              <template slot="header">
                <span>category</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.categoryName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="200px">
              <template slot="header">
                <span>supplier</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.supplierName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="300px">
              <template slot="header">
                <span>description</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="150px">
              <template slot="header">
                <span>EXP Date</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.expDate }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="150px">
              <template slot="header">
                <span>brand</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.brandName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="150px">
              <template slot="header">
                <span>unit</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.unitName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed="right" min-width="150px">
              <template slot="header">
                <span>Action</span>
              </template>
              <template slot-scope="{row}">
                <el-button type="warning" size="mini" @click="editClick(row)">Edit</el-button>
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  icon="el-icon-info"
                  icon-color="red"
                  title="Are you sure to delete this?"
                  @onConfirm="deleteProduct(row)"
                >
                  <el-button slot="reference" type="danger" size="mini">Delete</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>

          </el-table>

          <el-pagination
            v-if="productData.length > 0"
            :page-sizes="[5,10,20,30]"
            :page-size="pageSize"
            :page-index="pageIndex"
            layout="sizes, prev, pager, next"
            :total="totalCount"
            style="float:right;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />

        </div>
      </el-tab-pane>
      <el-tab-pane label="Add Product" name="add">
        <el-form ref="createForm" :model="createProductForm" :rules="rules" label-width="220px" style="width: 500px">
          <el-form-item label="Product Code" prop="productCode">
            <el-input v-model="createProductForm.productCode" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Product Name" prop="productName">
            <el-input v-model="createProductForm.productName" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Product Description" prop="productDescription">
            <el-input v-model="createProductForm.description" type="textarea" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Category" prop="category">
            <el-select v-model="selectedCategory" value-key="categoryName" placeholder="Select" style="width: 280px">
              <el-option
                v-for="item of categoryList"
                :key="item.categoryCode"
                :label="item.categoryName"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Brand" prop="Brand">
            <el-select v-model="selectedBrand" value-key="brandName" placeholder="Select" style="width: 280px">
              <el-option
                v-for="item of brandList"
                :key="item.brandCode"
                :label="item.brandName"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Supplier" prop="supplier">
            <el-autocomplete
              v-model="selectedSupplier"
              popper-class="my-autocomplete"
              :fetch-suggestions="querySearchAsync"
              placeholder="Please input"
              style="width: 280px"
              @select="handleSelect"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.name }}</div>
                <span class="phone">{{ item.phone }}&nbsp;&nbsp;{{ item.addressOne }}</span>
              </template>
              <el-button slot="append" icon="el-icon-circle-plus-outline" />
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="Exp: Date" prop="expDate">
            <el-date-picker
              v-model="createProductForm.expDate"
              style="min-width: 280px"
              type="date"
              placeholder="Expire Date"
            />
          </el-form-item>
          <el-form-item label="Unit" prop="Unit">
            <el-select v-model="selectedUnit" value-key="unitName" placeholder="Select" style="width: 280px" @change="changeSelectedUnit">
              <el-option
                v-for="item of unitList"
                :key="item.id"
                :label="item.unitName"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item v-if="packageUnitList.length !== 0" label="Unit Package" prop="PKG">
            <el-checkbox-group v-model="createProductForm.unit" value-key="unitName">
              <el-checkbox v-for="(item,i) in packageUnitList" :key="i" :disabled="item.id===selectedUnit.id?true:false" :label="item">{{ item.unitName }}&nbsp;&nbsp; <span v-if="item.id !== selectedUnit.id">( {{ item.childUnitQty }} {{ item.childUnitName }} / {{ item.unitName }} )<span /></span></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Re-Order Limit" prop="reOrder">
            <el-input v-model="createProductForm.reOrder" type="number" min="0" placeholder="0" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Tax %" prop="reOrder">
            <el-input v-model="createProductForm.taxPercent" type="number" min="0" placeholder="0" autocomplete="off" />
          </el-form-item>

          <el-form-item label="image" prop="image">
            <el-upload
              style="border: 1px dashed; width: 100px; height: 100px;"
              class="avatar-uploader"
              :action="imageUploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createOk">Create</el-button>
            <el-button @click="createReset">Reset</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
      <!-- <el-tab-pane label="Edit Products" name="update" :disabled="true">
        <el-form ref="createForm" label-width="220px" style="width: 500px">
          <el-form-item label="Labeler Code" prop="labelerCode">
            <el-input v-model="product.labelerCode" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Product Code" prop="productCode">
            <el-input v-model="product.productCode" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Product Name" prop="productName">
            <el-input v-model="product.productName" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Category" prop="category">
            <el-select v-model="product.category" placeholder="Select" style="width: 280px">
              <el-option
                v-for="item in categoryList"
                :key="item.categoryCode"
                :label="item.categoryName"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Brand" prop="Brand">
            <el-select v-model="product.brand" placeholder="Select" style="width: 280px">
              <el-option
                v-for="item in categoryList"
                :key="item.categoryCode"
                :label="item.categoryName"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="TypeIndicator" prop="TypeIndicator">
            <el-input v-model="product.typeIndicator" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Exp: Date" prop="expDate">
            <el-input v-model="product.expDate" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Unit Type" prop="unitType">
            <el-input v-model="product.unitType" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Unit Per Pkg Size" prop="unitPerPkgSize">
            <el-input v-model="product.unitPerPkgSize" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="FDA Approval Date" prop="FDAApprovalDate">
            <el-input v-model="product.FDAApprovalDate" type="date" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Market Date" prop="marketDate">
            <el-input v-model="product.marketDate" type="date" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="tec" prop="tec">
            <el-input v-model="product.tec" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="FDA ProductName" prop="FDAProductName">
            <el-input v-model="product.FDAProductName" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Clotting Factor Indicator" prop="clottingFactorIndicator">
            <el-input v-model="product.clottingFactorIndicator" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Pediatric Indicator" prop="pediatricIndicator">
            <el-input v-model="product.pediatricIndicator" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Pkg Size Intro Date" prop="PkgSizeIntroDate">
            <el-input v-model="product.PkgSizeIntroDate" type="date" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Purchased Product Date" prop="purchasedProductDate">
            <el-input v-model="product.purchasedProductDate" type="date" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="COD Status" prop="CODStatus">
            <el-input v-model="product.CODStatus" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="OTC" prop="OTC">
            <el-input v-model="product.OTC" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Reactivation Date" prop="reactivationDate">
            <el-input v-model="product.reactivationDate" type="date" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Line Extension Indicator" prop="lineExtensionIndicator">
            <el-input v-model="product.lineExtensionIndicator" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="filler" prop="filler">
            <el-input v-model="product.filler" type="text" placeholder="" autocomplete="off" />
          </el-form-item>
          <el-form-item label="image" prop="image">
            <el-upload
              style="border: 1px dashed; width: 100px; height: 100px;"
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateOk">Update</el-button>
            <el-button @click="updateReset">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import { Product } from '../../mixinsFile/product'

export default {
  name: 'Index',
  mixins: [Product]
}
</script>

<style scoped>
.product-container {
  margin: 30px;
}
 .img-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 50px;
  height: 50px;
  }
.avatar-uploader .el-upload {
    border: 1px dashed #887b7b;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 98px;
    height: 98px;
    display: block;
  }
  .my-autocomplete li {
      padding: 7px;
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
