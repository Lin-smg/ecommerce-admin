<template>
  <div class="brand-container">
    <el-card>
      <div class="header" style="margin-bottom: 10px">
        <span style="line-height: 40px">Brand</span>

        <el-button style="float: right; margin-left: 30px" type="primary" @click="showDialog('add')">Add</el-button>

        <div style="width: 250px; float: right">
          <el-input v-model="searchValue" placeholder="Please input" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getBrand" />
          </el-input>
        </div>
      </div>

      <div style="">
        <el-table
          border
          :data="brandData"
          style="width: 100%;background-color: #e9e3e3"
          highlight-current-row
        >
          <el-table-column align="center">
            <template slot="header">
              <span>Code</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.brandCode }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>name</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.brandName }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>description</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>Action</span>
            </template>
            <template slot-scope="{row}">
              <el-button type="warning" size="mini" @click="showDialog('edit',row)">Edit</el-button>
              <el-popconfirm
                confirm-button-text="OK"
                cancel-button-text="No, Thanks"
                icon="el-icon-info"
                icon-color="red"
                title="Are you sure to delete this?"
                @onConfirm="deleteBrand(row)"
              >
                <el-button slot="reference" type="danger" size="mini">Delete</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          v-if="brandData.length > 0"
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
    </el-card>

    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
    >
      <el-form ref="brand" :model="brand" :rules="brandRule" label-width="220px" style="width: 500px">

        <el-form-item label="Brand Code" prop="brandCode">
          <el-input v-model="brand.brandCode" type="text" placeholder="brand code" autocomplete="off" :disabled="dialog.title === 'Edit' ? true : false" @input="toUpperCaseWord(brand,'brandCode')" />
        </el-form-item>
        <el-form-item label="Brand Name" prop="brandName">
          <el-input v-model="brand.brandName" type="text" placeholder="brand name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="brand.description" type="textarea" :row="3" placeholder="description" autocomplete="off" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createOrUpdateBrand(dialog.title)">Confirm</el-button>
        <el-button @click="resetBrand">Cancel</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
import { Brand } from '../../mixinsFile/brand'

export default {
  name: 'Index',
  mixins: [Brand]
}
</script>

<style scoped>
.brand-container {
  margin: 30px;
}
</style>
