<template>
  <div class="category-container">
    <el-card>
      <div class="header" style="margin-bottom: 10px">
        <span style="line-height: 40px">Category</span>

        <el-button style="float: right; margin-left: 30px" type="primary" @click="showDialog('add')">Add</el-button>

        <div style="width: 250px; float: right">
          <el-input v-model="searchValue" placeholder="Please input" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" />
          </el-input>
        </div>
      </div>

      <div style="">
        <el-table
          border
          :data="categoryData"
          style="width: 100%;background-color: #e9e3e3"
          highlight-current-row
        >
          <el-table-column align="center">
            <template slot="header">
              <span>Code</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.categoryCode }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>name</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.categoryName }}</span>
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
                @onConfirm="deleteCategory(row)"
              >
                <el-button slot="reference" type="danger" size="mini">Delete</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :page-sizes="[10,20,30]"
          :page-size="pageSize"
          :page-index="pageIndex"
          layout="sizes, prev, pager, next"
          :total="categoryData.length"
          style="float:right;"
          @size-change="onPageSizeChange"
          @current-change="onPageIndexChange"
        />
      </div>
    </el-card>

    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
    >
      <el-form ref="createForm" label-width="220px" style="width: 500px">

        <el-form-item label="Category Code" prop="code">
          <el-input v-model="category.categoryCode" type="text" placeholder="category name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Category Name" prop="name">
          <el-input v-model="category.categoryName" type="text" placeholder="category name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Description" prop="description">
          <el-input v-model="category.description" type="text" placeholder="description" autocomplete="off" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
import { Category } from '../../mixinsFile/category'

export default {
  name: 'Index',
  mixins: [Category]
}
</script>

<style scoped>
.category-container {
  margin: 30px;
}
</style>
