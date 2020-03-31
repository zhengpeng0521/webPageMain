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
  Statistic,
  Transfer,
  Tree,
  DatePicker,
  Radio
} from "antd"
import style from "./SaasPackageOpening.less"
import QueueAnim from "rc-queue-anim"

import ReactDOM from "react-dom"
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
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

const SaasPackageOpeningModal = ({
  saasPackageOpeningModalVisible, //modal是否显示
  saasPackageOpeningModalButtonLoading, //modal按钮是否在加载状态
  saasPackageOpeningModalSelectContent, //套餐列表数据
  saasPackageOpeningModalSearchType, //机构搜索方式(0按机构和机构手机号/1按租户查询)
  saasPackageOpeningModalTenantSelectVisible, //租户下拉列表是否显示(搜素租户之后才显示)
  saasPackageOpeningModalTenantSelectContent, //租户下拉列表数据
  saasPackageOpeningModalOrgArray, //接口获取的机构原始数据
  saasPackageOpeningModalTransferAllcontent, //机构穿梭框左边数据
  saasPackageOpeningModalTransferTargetContent, //机构穿梭框右边数据

  MealListResTypeOnChange, //根据系统类型查询当前套餐
  SaasPackageOpeningModalCancel, //模态框关闭
  SaasPackageOpeningModalChooseQueryType, //选择搜索方式onChange事件
  SaasPackageOpeningModalTransferhandleChange, //穿梭款onChange事件
  CheckIncludeModular, //查看套餐中的模块
  SaasPackageOpeningModalSubmit, //表单提交
  SaasPackageOpeningModalSearchOrgNameOrTel, //机构名称或手机号搜索
  SaasPackageOpeningModalSearchTenant, //搜索租户列表
  SaasPackageOpeningModalSearchOrgByTenant, //通过租户搜索机构
  selectFunc, // select
  moduleName, //选中的名字
  selectPackage, // 选中的数组名字id
  selectPackageName,
  form: {
    getFieldDecorator,
    // 表单进行双向
    validateFields,
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
    getFieldsValue,
    // 获取一组输入控件的值，如不传入参数，则获取全部组件的值
    setFieldsValue,
    // 设置一组输入控件的值
    resetFields,
    // 重置所有输入的值
    getFieldValue,
    // 获取一个输入控件的值
    validateFieldsAndScroll
    // 较检表单没有填的自动滚动指定区域
  }
}) => {
  /*租户下拉列表数据*/
  let tenant = []
  if (
    saasPackageOpeningModalTenantSelectContent &&
    saasPackageOpeningModalTenantSelectContent.length > 0
  ) {
    tenant = saasPackageOpeningModalTenantSelectContent.map(item => {
      return (
        <Option value={item.id + ""} key={item.id + ""}>
          {item.name}
        </Option>
      )
    })
  }

  /*套餐列表数据*/
  let children = []
  if (
    saasPackageOpeningModalSelectContent &&
    saasPackageOpeningModalSelectContent.length > 0
  ) {
    children = saasPackageOpeningModalSelectContent.map(item => {
      return (
        <Option value={item.id} key={item.id}>
          {item.name}
        </Option>
      )
    })
  }

  function handleComplete(e) {
    e.preventDefault()
    validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        return
      }
      let data = getFieldsValue()
      let dataResPackagesConfigIds = data.resPackagesConfigId.join(',')
      data.resPackagesConfigId = dataResPackagesConfigIds
      if (saasPackageOpeningModalTransferTargetContent.length == 0) {
        message.error("请选择机构")
        return
      }
      let orgInfo = []
      for (let i in saasPackageOpeningModalOrgArray) {
        for (let j in saasPackageOpeningModalTransferTargetContent) {
          if (saasPackageOpeningModalSearchType == "0") {
            if (
              saasPackageOpeningModalTransferTargetContent[j] ==
              saasPackageOpeningModalOrgArray[i].id
            ) {
              orgInfo.push({
                tenantId: saasPackageOpeningModalOrgArray[i].tenantId,
                orgId: saasPackageOpeningModalOrgArray[i].id
              })
            }
          } else if (saasPackageOpeningModalSearchType == "1") {
            if (
              saasPackageOpeningModalTransferTargetContent[j] ==
              saasPackageOpeningModalOrgArray[i].orgId
            ) {
              orgInfo.push({
                tenantId: saasPackageOpeningModalOrgArray[i].tenantId,
                orgId: saasPackageOpeningModalOrgArray[i].orgId
              })
            }
          }
        }
      }

      data.orgInfo = JSON.stringify(orgInfo)
      data.expireTime = values.expireTime.format("YYYY-MM-DD HH:mm:ss")
      // console.log(data)
      delete data.searchType
      delete data.id
      delete data.name
      delete data.tel
      delete data.orgName
      delete data.org
      delete data.tenantSelect
      // console.log('new',data)
      // return
      SaasPackageOpeningModalSubmit(data)
      SaasPackageOpeningModalCancel()
    })
  }

  function handleCancel(e) {
    e.preventDefault()
    resetFields()
    SaasPackageOpeningModalCancel()
  }
  function changeStatus(e) {
    let num = e.target.value.length
    if (num >= 101) {
      message.error("已经达到最大字数")
      e.target.value = e.target.value.substring(0, 100)
      return
    }
  }

  /*查看套餐类型*/
  function checkPackage(id, name) {
    if (id == undefined || id == null || id == "") {
      message.error("请先选择套餐类型")
      return
    } else {
      CheckIncludeModular(id, name)
    }
  }

  //校验套餐数量
  function checkPackageNum(rule, value, callback) {
    if (value == "" || value == undefined || value == null) {
      callback()
    } else if (!/^[1-9]\d*$/.test(value)) {
      callback(new Error("套餐数量必须为正整数"))
    } else {
      callback()
    }
  }
  // function selectFunc(val,option) {
  //     console.info(option.props.children)
  //     // checkPackage(option)
  // }

  //模态框的属性
  let modalOpts = {
    title: "开通套餐",
    maskClosable: false,
    visible: saasPackageOpeningModalVisible,
    closable: true,
    width: 700,
    onOk: handleComplete,
    onCancel: handleCancel,
    footer: [
      <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>
        取 消
      </Button>,
      <Button
        key="submit"
        type="primary"
        size="large"
        onClick={handleComplete}
        disabled={saasPackageOpeningModalButtonLoading}
        loading={saasPackageOpeningModalButtonLoading}>
        保存
      </Button>
    ]
  }

  function RadioOnChange(e) {
    //如果是搜索机构，则清空机构输入框
    if (!!getFieldValue("orgName")) {
      setFieldsValue({ orgName: undefined })
    }
    if (!!getFieldValue("resPackagesConfigId")) {
      setFieldsValue({ resPackagesConfigId: undefined })
    }
    MealListResTypeOnChange(e)
  }

  return (
    <div className="zj_modal_header">
      <Modal {...modalOpts}>
        <Form>
          <FormItem label="系统类型" {...formItemLayout}>
            {getFieldDecorator("resType", {
              initialValue: "1",
              rules: [{ required: true, message: "系统类型" }]
            })(
              <Radio.Group onChange={RadioOnChange}>
                <Radio value="1">机构</Radio>
                <Radio value="2">总部</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="搜索方式" {...formItemLayout}>
            {getFieldDecorator("searchType", {
              initialValue: "1",
              rules: [{ required: true, message: "请填写搜索方式" }]
            })(
              <Select
                placeholder="请选择搜索方式"
                style={{ width: 200 }}
                onChange={SaasPackageOpeningModalChooseQueryType}>
                <Option value="0">按机构名称或者机构手机号查询</Option>
                <Option value="1">按租户查询</Option>
              </Select>
            )}
          </FormItem>
        </Form>
        {saasPackageOpeningModalSearchType == "0" ? (
          <Form>
            <div style={{ position: "relative" }}>
              <FormItem label="搜索机构" {...formItemLayout}>
                {getFieldDecorator("orgName", {})(
                  <Input
                    placeholder="请输入机构名称或手机号"
                    style={{ width: 200 }}
                  />
                )}
              </FormItem>
              <span>
                <a
                  className={style.check}
                  style={{ position: "absolute", left: "340px", top: "7px" }}
                  onClick={() =>
                    SaasPackageOpeningModalSearchOrgNameOrTel(
                      getFieldValue("orgName"),
                      getFieldValue("resType")
                    )
                  }>
                  搜索
                </a>
              </span>
            </div>
          </Form>
        ) : saasPackageOpeningModalSearchType == "1" ? (
          <Form inline style={{ marginBottom: "22.5px" }}>
            <div style={{ position: "relative" }}>
              <FormItem
                label="搜索条件"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 12 }}
                style={{ marginLeft: "24px" }}>
                {getFieldDecorator("id")(
                  <Input placeholder="租户ID" style={{ width: 150 }} />
                )}
              </FormItem>
              <FormItem
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 12 }}
                style={{ marginLeft: "30px" }}>
                {getFieldDecorator("name")(
                  <Input placeholder="租户名称" style={{ width: 150 }} />
                )}
              </FormItem>
              <FormItem
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 12 }}
                style={{ marginLeft: "4px" }}>
                {getFieldDecorator("tel")(
                  <Input placeholder="租户手机号" style={{ width: 150 }} />
                )}
              </FormItem>
              <span>
                <a
                  className={style.check}
                  style={{ position: "absolute", top: "12px" }}
                  onClick={() =>
                    SaasPackageOpeningModalSearchTenant(
                      getFieldValue("id"),
                      getFieldValue("name"),
                      getFieldValue("tel")
                    )
                  }>
                  搜索
                </a>
              </span>
            </div>
          </Form>
        ) : null}

        <Form>
          {saasPackageOpeningModalTenantSelectVisible == true ? (
            <FormItem label="选择租户" {...formItemLayout}>
              {getFieldDecorator("tenantSelect")(
                <Select
                  placeholder="请选择租户"
                  style={{ width: 200 }}
                  onChange={e =>
                    SaasPackageOpeningModalSearchOrgByTenant(
                      e,
                      getFieldValue("resType")
                    )
                  }>
                  {tenant || []}
                </Select>
              )}
            </FormItem>
          ) : null}
          <FormItem label="选择机构" {...formItemLayout}>
            {getFieldDecorator("org", {})(
              <Transfer
                dataSource={saasPackageOpeningModalTransferAllcontent}
                targetKeys={saasPackageOpeningModalTransferTargetContent}
                operations={["加入", "退出"]}
                onChange={SaasPackageOpeningModalTransferhandleChange}
                listStyle={{ width: 216, height: 200 }}
                titles={["全部机构", "已选机构"]}
                render={item => item.title}
              />
            )}
          </FormItem>
        </Form>
        <Form inline style={{ marginBottom: "8.5px" }}>
          <FormItem
            label="选择套餐"
            // labelCol={{ span: 9 }}
            // wrapperCol={{ span: 12 }}
            style={{ marginLeft: "37px" }}>
            {getFieldDecorator("resPackagesConfigId", {
              rules: [{ required: true, message: "请填写套餐名称" }]
            })(
              <Select
                mode="multiple"
                placeholder="请选择套餐"
                style={{ width: 500 }}
                onChange={selectFunc}>
                {children || []}
              </Select>
            )}
          </FormItem>
          <FormItem>
            <span className={style.selectPackageStyle}>
              {selectPackageName &&
                selectPackageName.map(item => {
                  return (
                    <span
                      key={item.id}
                      className={style.itemOne}
                      onClick={() => checkPackage(item.id, item.name)}>
                      {item.name}
                    </span>
                  )
                })}
            </span>
          </FormItem>
        </Form>
        <Form layout="horizontal">
          <FormItem label="套餐日期" {...formItemLayout}>
            {getFieldDecorator("expireTime", {
              rules: [{ required: true, message: "请选择套餐日期" }]
            })(
              <DatePicker
                style={{ width: 200 }}
                placeholder="请选择套餐日期"
                format="YYYY-MM-DD"
              />
            )}
          </FormItem>

          <FormItem label="备注" {...formItemLayout}>
            {getFieldDecorator("remark", {})(
              <Input
                type="textarea"
                placeholder="请填写简介"
                rows={4}
                onChange={changeStatus}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    </div>
  )
}

export default Form.create()(SaasPackageOpeningModal)
