import React, { PropTypes } from "react"
import {
  Form,
  Input,
  Modal,
  Button,
  Upload,
  Icon,
  message,
  Select,
  Transfer,
  Tree,
  Spin,
  Radio
} from "antd"
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TreeNode = Tree.TreeNode

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 18
  }
}

const homePagePopoverModal = ({
  addOrEditSaasScrmOverViwePopoverModalType, //套餐管理新增修改类型('add'/'edit')
  addOrEditSaasScrmOverViwePopoverModalVisible, //套餐管理modal是否显示
  addOrEditSaasScrmOverViwePopoverModalData, //套餐管理编辑时回填数据
  addOrEditSaasScrmOverViwePopoverButtonLoading, //套餐管理按钮是否加载状态

  AddOrEditSaasScrmOverViwePopoverModalSubmit, //表单提交
  AddOrEditSaasScrmOverViwePopoverModalCancel, //关闭modal

  type, //业务类型
  radioChangeFunc, //选择频次函数

  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
    getFieldValue,
    validateFieldsAndScroll
  }
}) => {
  // 提交
  function handleComplete(e) {
    e.preventDefault()
    validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        return
      }
      let data = getFieldsValue()
      //处理图片显示
      if (data.IMG == "" || data.IMG == null || data.IMG == undefined) {
        data.image = ""
      } else {
        data.image = data.IMG[0].url
          ? data.IMG[0].url
          : data.IMG[0].response.data.url
      }
      delete data.IMG

      AddOrEditSaasScrmOverViwePopoverModalSubmit(data)
    })
  }

  // 取消
  function handleCancel(e) {
    e.preventDefault()
    resetFields()
    AddOrEditSaasScrmOverViwePopoverModalCancel()
  }

  //模态框的属性
  let modalOpts = {
    title:
      "add" == addOrEditSaasScrmOverViwePopoverModalType
        ? "新增首页弹框"
        : "编辑首页弹框",
    maskClosable: false,
    visible: addOrEditSaasScrmOverViwePopoverModalVisible,
    closable: true,
    width: 650,
    // onOk: handleComplete,
    onCancel: handleCancel,
    footer: [
      <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>
        取消
      </Button>,
      <Button
        key="submit"
        type="primary"
        size="large"
        onClick={handleComplete}
        disabled={addOrEditSaasScrmOverViwePopoverButtonLoading}
        loading={addOrEditSaasScrmOverViwePopoverButtonLoading}>
        保存
      </Button>
    ]
  }

  /*上传图片属性*/
  let imgurlUploadProps = {
    name: "file",
    action: `${BASE_URL}/systemController/upload`,
    listType: "picture-card",
    headers: {
      authorization: "authorization-text"
    },
    onChange(info) {
      if (info.file.status === "done") {
        info.file.url = info.file.response.data.url
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 上传失败`)
      }
    },
    beforeUpload(file) {
      let imgurl_list = getFieldValue("IMG")
      if (imgurl_list && imgurl_list.length > 0) {
        message.error("只能选择一张图片")
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error("图片大小不能超过2M")
        return false
      }
      return true
    }
  }

  // // 获取图片的宽度
  // function getNaturalWidth(img) {
  //     return new Promise((res, rej) => {
  //         let image = new Image()
  //         image.src = img

  //         image.onload =function(){
  //             res([image.width, image.height])
  //         }
  //     })

  // }

  function normFile(e) {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  let url =
    addOrEditSaasScrmOverViwePopoverModalType == "edit" &&
    addOrEditSaasScrmOverViwePopoverModalData.image &&
    addOrEditSaasScrmOverViwePopoverModalData.image != null &&
    addOrEditSaasScrmOverViwePopoverModalData.image != "" &&
    addOrEditSaasScrmOverViwePopoverModalData.image != undefined
      ? addOrEditSaasScrmOverViwePopoverModalData.image
      : null
  let displayImg = [
    {
      uid: -1,
      url: url,
      name: url,
      thumbUrl: url
    }
  ]

  /*检验图片是否上传*/
  function checkImgUrl(rule, value, callback) {
    if (value == undefined || value == "" || value == null) {
      callback(new Error("请选择图片"))
    } else {
      callback()
    }
  }
  // function checkImgUrl(rule, value, callback){
  //     let imgUrl = ''

  //     if(addOrEditSaasScrmOverViwePopoverModalType == 'edit') {
  //         imgUrl = value[0].url
  //     } else {
  //         imgUrl = value[0].response.data.url
  //     }

  //     getNaturalWidth(imgUrl).then((ret) => {
  //         let width = ret[0]
  //         let height = ret[1]

  //         if(value == undefined || value == '' || value == null){
  //             callback(new Error('请选择图片'));
  //         } else if(width !== 500 || height !== 425) {
  //             callback(new Error('图片尺寸必须为500×425px'))
  //         }
  //         callback();
  //     })
  // }
  /*限定排序值*/
  function checkSort(e) {
    const value = e.target.value
    if (!value.replace(/[^\d]/g, "").replace(/^0{1,}/g, "") && value != "") {
      e.target.value = "1"
      message.error("只能输入大于0数字!")
      return
    }
    if (value > 100) {
      e.target.value = "100"
    }
  }

  //单选按钮
  function radioChange(e) {
    let data = e.target.value
    radioChangeFunc(data)
  }

  return (
    <div className="zj_modal_header">
      <Modal {...modalOpts}>
        <Form>
          {/* 弹框图片 */}
          <FormItem label="弹框图片" {...formItemLayout}>
            {getFieldDecorator("IMG", {
              initialValue:
                addOrEditSaasScrmOverViwePopoverModalType == "edit"
                  ? displayImg[0].url != ""
                    ? displayImg
                    : null
                  : null,
              valuePropName: "fileList",
              normalize: normFile,
              rules: [{ required: true, validator: checkImgUrl }]
            })(
              <Upload {...imgurlUploadProps}>
                {getFieldValue("IMG") &&
                getFieldValue("IMG").length > 0 ? null : (
                  <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">选择图片</div>
                  </div>
                )}
              </Upload>
            )}
            <div style={{ overflow: "hidden", width: "100%" }}>
              图片尺寸为700×580px；限png，jpeg，gif格式；大小≤2M
            </div>
          </FormItem>

          {/* 外链 */}
          <FormItem label="外链" {...formItemLayout}>
            {getFieldDecorator("link", {
              initialValue:
                addOrEditSaasScrmOverViwePopoverModalType == "edit" &&
                addOrEditSaasScrmOverViwePopoverModalData.link
                  ? addOrEditSaasScrmOverViwePopoverModalData.link + ""
                  : undefined
            })(<Input type="textarea" rows={3} placeholder="请填写外链" />)}
          </FormItem>

          {/* 排序值 */}
          <FormItem label="排序值" {...formItemLayout}>
            {getFieldDecorator("sort", {
              initialValue:
                addOrEditSaasScrmOverViwePopoverModalType == "edit" &&
                addOrEditSaasScrmOverViwePopoverModalData.sort
                  ? addOrEditSaasScrmOverViwePopoverModalData.sort + ""
                  : undefined,
              rules: [
                {
                  required: true,
                  message: "请输入排序值"
                }
              ]
            })(
              <Input
                onChange={checkSort}
                placeholder="排序值"
                style={{ width: "20%" }}
              />
            )}
            <div>排序值越大排在越前面，1~100之间的整数</div>
          </FormItem>

          {/* 频次 */}
          <FormItem label="频次" {...formItemLayout}>
            {getFieldDecorator("frequency", {
              initialValue:
                addOrEditSaasScrmOverViwePopoverModalType == "edit" &&
                addOrEditSaasScrmOverViwePopoverModalData.frequency
                  ? addOrEditSaasScrmOverViwePopoverModalData.frequency + ""
                  : addOrEditSaasScrmOverViwePopoverModalType == "add"
                  ? "0"
                  : "0",
              rules: [{ required: true, message: "请选择频次" }]
            })(
              <RadioGroup onChange={radioChange}>
                <Radio value="0">总共弹一次</Radio>
                <Radio value="1">每天弹一次</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Form>
      </Modal>
    </div>
  )
}

export default Form.create()(homePagePopoverModal)
