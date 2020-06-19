<template>
  <div class="profile-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div
            style="text-align:center"
            @mouseover="imgEdit = true"
            @mouseleave="imgEdit = false"
          >

            <el-upload
              class="avatar-uploader"
              action="/dev-api/shared/companyIMG"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <i v-if="imgEdit && !imgUpload" class="el-icon-edit" style="position: absolute; color: #132584; font-size: 25px; top: 200px" @click="imgUpload = true" />
            <i v-if="imgEdit && imgUpload" class="el-icon-delete" style="position: absolute; color: #132584; font-size: 25px; top: 170px; left: 270px" @click="imgUpload = false" />
          </div>
          <div style="text-align: center; margin: 10px">
            <label>Logo</label>
          </div>
          <hr>
          <div>
            <div>
              <i class="el-icon-social" />
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Basic Info</span>
            <i class="el-icon-info" style="font-size: 20px; color: #474ce4" />
            <el-button size="mini" style="float: right;" type="primary" icon="el-icon-edit" circle @click="editVisible = true" />

          </div>

          <div>
            <el-row :gutter="10" style="padding: 10px">
              <el-col :span="1">
                <i class="el-icon-collection-tag" />
              </el-col>
              <el-col :span="8"><span>Company Code</span>
              </el-col>
              <el-col :span="1">:</el-col>
              <el-col :span="14">
                <span>{{ companyProfile.companyCode }}</span>
              </el-col>
            </el-row>
            <hr>

            <el-row :gutter="10" style="padding: 10px">
              <el-col :span="1">
                <i class="el-icon-collection-tag" />
              </el-col>
              <el-col :span="8">
                <span>Company Name</span>
              </el-col>
              <el-col :span="1">:</el-col>
              <el-col :span="14">
                <span>{{ companyProfile.companyName }}</span>
              </el-col>
            </el-row>
            <hr>

            <el-row :gutter="10" style="padding: 10px">
              <el-col :span="1">
                <i class="el-icon-collection-tag" />
              </el-col>
              <el-col :span="8">
                <span>Company Type</span>
              </el-col>
              <el-col :span="1">:</el-col>
              <el-col :span="14">
                <span>{{ companyProfile.companyType }}</span>
              </el-col>
            </el-row>
            <hr>

            <el-row :gutter="10" style="padding: 10px">
              <el-col :span="1">
                <i class="el-icon-phone-outline" />
              </el-col>
              <el-col :span="8">
                <span>Company Phone</span>
              </el-col>
              <el-col :span="1">:</el-col>
              <el-col :span="14">
                <span>{{ companyProfile.companyPhone }}</span>
              </el-col>
            </el-row>
            <hr>

            <el-row :gutter="10" style="padding: 10px">
              <el-col :span="1">
                <i class="el-icon-message" />
              </el-col>
              <el-col :span="8">
                <span>Company Email</span>
              </el-col>
              <el-col :span="1">:</el-col>
              <el-col :span="14">
                <span>{{ companyProfile.companyEmail }}</span>
              </el-col>
            </el-row>
            <hr>

            <el-row :gutter="10" style="padding: 10px">
              <el-col :span="1">
                <i class="el-icon-map-location" />
              </el-col>
              <el-col :span="8">
                <span>Company Address</span>
              </el-col>
              <el-col :span="1">:</el-col>
              <el-col :span="14">
                <span>{{ companyProfile.companyAddress }}</span>
              </el-col>
            </el-row>
            <hr>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      title="Edit"
      :visible.sync="editVisible"
      width="580px"
    >

      <div>
        <el-row :gutter="10" style="padding: 10px; line-height: 30px;">
          <el-col :span="1">
            <i class="el-icon-collection-tag" />
          </el-col>
          <el-col :span="6"><span>Company Code</span>
          </el-col>
          <el-col :span="1">:</el-col>
          <el-col :span="14">
            <el-input v-model="companyProfile.companyCode" size="small" />
          </el-col>
        </el-row>

        <el-row :gutter="10" style="padding: 10px; line-height: 30px;">
          <el-col :span="1">
            <i class="el-icon-collection-tag" />
          </el-col>
          <el-col :span="6">
            <span>Company Name</span>
          </el-col>
          <el-col :span="1">:</el-col>
          <el-col :span="14">
            <el-input v-model="companyProfile.companyName" size="small" />
          </el-col>
        </el-row>

        <el-row :gutter="10" style="padding: 10px; line-height: 30px;">
          <el-col :span="1">
            <i class="el-icon-collection-tag" />
          </el-col>
          <el-col :span="6">
            <span>Company Type</span>
          </el-col>
          <el-col :span="1">:</el-col>
          <el-col :span="14">
            <el-input v-model="companyProfile.companyType" size="small" />
          </el-col>
        </el-row>

        <el-row :gutter="10" style="padding: 10px; line-height: 30px;">
          <el-col :span="1">
            <i class="el-icon-phone-outline" />
          </el-col>
          <el-col :span="6">
            <span>Company Phone</span>
          </el-col>
          <el-col :span="1">:</el-col>
          <el-col :span="14">
            <el-input v-model="companyProfile.companyPhone" type="tel" size="small" />
          </el-col>
        </el-row>

        <el-row :gutter="10" style="padding: 10px; line-height: 30px;">
          <el-col :span="1">
            <i class="el-icon-message" />
          </el-col>
          <el-col :span="6">
            <span>Company Email</span>
          </el-col>
          <el-col :span="1">:</el-col>
          <el-col :span="14">
            <el-input v-model="companyProfile.companyEmail" size="small" />
          </el-col>
        </el-row>

        <el-row :gutter="10" style="padding: 10px; line-height: 30px;">
          <el-col :span="1">
            <i class="el-icon-map-location" />
          </el-col>
          <el-col :span="6">
            <span>Company Address</span>
          </el-col>
          <el-col :span="1">:</el-col>
          <el-col :span="14">
            <el-input v-model="companyProfile.companyAddress" type="textarea" :rows="3" size="small" />
          </el-col>
        </el-row>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editVisible = false">Cancel</el-button>
        <el-button size="small" type="primary" @click="createCompanyProfile">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { Company } from '../../mixinsFile/company'
export default {
  name: 'Index',
  mixins: [Company]
}
</script>

<style scoped>
.profile-container {
  margin: 30px;
}
hr {

    border: none;
    height: 1px;
    background: #e2d6d6;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
