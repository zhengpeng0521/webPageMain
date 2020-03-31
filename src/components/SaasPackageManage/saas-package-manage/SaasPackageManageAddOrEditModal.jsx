import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Tree, Spin, Radio, InputNumber } from 'antd';
// import console = require('console');

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

const SaasPackageManageAddOrEditModal = ({
    modularResType,                             //模块类型(1机构/2总部)
    addOrEditSaasPackageModalType,              //套餐管理新增修改类型('add'/'edit')
    addOrEditSaasPackageModalVisible,           //套餐管理modal是否显示
    addOrEditSaasPackageModalData,              //套餐管理编辑时回填数据
    addOrEditSaasPackageButtonLoading,          //套餐管理按钮是否加载状态
    addOrEditSaasPackageransferAllContent,      //穿梭框内所有模板的值
    addOrEditSaasPackageTransferTargetContent,  //穿梭框所选中的模板             
    ModularResTypeOnChange,                     //切换系统类型(1机构/2总部)事件
    AddOrEditSaasPackageModalSubmit,            //表单提交
    AddOrEditSaasPackageModalCancel,            //关闭modal
    AddOrEditFormActivityTransferhandleChange,  //穿梭框onChange事件
    transferArrayChange,                        //穿梭框菜单模块onChange事件
    newtransferArray,                           //穿梭框菜单快右边数据
    transferArray,                              //穿梭框菜单模块左边数据
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
}) => {
    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors) => {
            if (!!errors) {
                return;
            }
            let data = getFieldsValue();


            if (addOrEditSaasPackageTransferTargetContent.length == 0 && newtransferArray.length == 0) {
                message.error('请至少选择一个模块');
                return;
            }
            // console.log(modularResType)
            if (data.resType == '2') {
                data.modules = newtransferArray.join(',');
                data.appCode = ''
            } else {
                data.appCode = newtransferArray.join(',');
            }
            data.zsbModulesId = addOrEditSaasPackageTransferTargetContent.join(',');
            // console.log(data)
            // return false;
            AddOrEditSaasPackageModalSubmit(data);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        AddOrEditSaasPackageModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: 'add' == addOrEditSaasPackageModalType ? '新增套餐' : '编辑套餐',
        maskClosable: false,
        visible: addOrEditSaasPackageModalVisible,
        closable: true,
        width: 650,
        onOk: handleComplete,
        onCancel: handleCancel,
        footer: [
            <Button key="cancel" type="ghost" size="large" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary" size="large"
                onClick={handleComplete}
                disabled={addOrEditSaasPackageButtonLoading}
                loading={addOrEditSaasPackageButtonLoading}>保存</Button>
        ],
    };

    //校验套餐名称
    function checkName(rule, value, callback) {
        if (value == '' || value == undefined || value == null) {
            callback();
        } else if (/^[\s]*$/.test(value)) {
            callback(new Error('套餐名称不能为空'));
        } else {
            callback();
        }
    }

    //校验套餐价格
    function checkPrice(rule, value, callback) {
        // console.log(value.length)
        if (value == '' || value == undefined || value == null) {
            callback();
        } else if (!(/^\d+(\.\d+)?$/.test(value))) {
            callback(new Error('价格输入有误，请检查是否非数字，超出限额或者小于等于0'));
        } else if (!(/^\d+(\.\d{1,2})?$/.test(value))) {
            callback(new Error('价格输入有误，不能超过小数点后两位'));
        } else {
            callback();
        }
    }

    function changeStatus(e) {

        let num = e.target.value.length;
        if (num >= 9) {
            message.error('已经达到最大字数',1);
            e.target.value = e.target.value.substring(0, 8);
            return;
        }
    }
    function Decimal(value){
        // console.log(value)
        if(value == "") return
        let objReg = new RegExp("^[1-9][0-9]*$");
        if (!objReg.test(value)){
            message.error('请输入正整数',0.1);
            return;
        }
    }
    return (
        <div className='zj_modal_header'>
            <Modal {...modalOpts}>
                <Form>
                    <FormItem
                        label="套餐名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name', {
                            initialValue: addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.name ? addOrEditSaasPackageModalData.name + '' : undefined,
                            rules: [
                                { required: true, message: '请填写套餐名称' }, { validator: checkName },
                            ],
                        })(
                            <Input type="text" placeholder='请填写套餐名称' />
                        )}
                    </FormItem>
                    <FormItem
                        label="价格"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('price', {
                            initialValue: addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.price ? addOrEditSaasPackageModalData.price + '' : undefined,
                            rules: [
                                { required: true, message: '请填写价格' }, { validator: checkPrice },
                            ],
                        })(
                            <Input type="text" placeholder='请填写价格' onChange={changeStatus} />
                        )}
                    </FormItem>
                    <FormItem
                        label="系统类型"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('resType', {
                            initialValue: addOrEditSaasPackageModalType == 'add' ? modularResType : (addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.resType) ? addOrEditSaasPackageModalData.resType + '' : undefined,
                            rules: [
                                { required: true, message: '系统类型' },
                            ],
                        })(
                            <RadioGroup onChange={ModularResTypeOnChange} disabled={addOrEditSaasPackageModalType == 'edit'}>
                                <Radio value='1'>机构</Radio>
                                <Radio value='2'>总部</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        label="单位"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('unitType', {
                            initialValue: addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.unitType ? addOrEditSaasPackageModalData.unitType + '' : undefined,
                            rules: [
                                { required: true, message: '请选择单位' },
                            ],
                        })(
                            <RadioGroup>
                                <Radio value='2'>月</Radio>
                                <Radio value='1'>季</Radio>
                                <Radio value='3'>年</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        label="类型"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('free', {
                            initialValue: addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.free ? addOrEditSaasPackageModalData.free + '' : addOrEditSaasPackageModalType == 'add' ? '0' : '0',
                            rules: [
                                { required: true, message: '类型' },
                            ],
                        })(
                            <RadioGroup>
                                <Radio value='0'>收费</Radio>
                                <Radio value='1'>免费

                                {getFieldValue('free') == '1' && getFieldValue('resType') == '1' ?
                                        getFieldDecorator('freeDay', {
                                            initialValue: addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.freeDay ? addOrEditSaasPackageModalData.freeDay + '' : addOrEditSaasPackageModalType == 'add' ? '' : undefined,

                                        })(
                                            <InputNumber
                                                min={1}
                                                placeholder="请输入天数"
                                                style={{ width: '90px', margin: '0 10px' }} 
                                                onChange={Decimal} />
                                        )
                                        : null}
                                    {getFieldValue('free') == '1' && getFieldValue('resType') == '1' ?
                                        '天'
                                        : null}
                                </Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {getFieldValue('resType') == '1' ?
                        <FormItem
                            label="套餐可见"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('isOrgCanSee', {
                                initialValue: addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.isOrgCanSee ? addOrEditSaasPackageModalData.isOrgCanSee + '' : addOrEditSaasPackageModalType == 'add' ? '1' : '0',
                                rules: [
                                    { required: true, message: '套餐可见' },
                                ],
                            })(
                                <RadioGroup>
                                    <Radio value='1'>机构可见</Radio>
                                    <Radio value='0'>机构不可见</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        : null}
                    <FormItem
                        label="菜单模块"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('appCode', {
                        })(
                            <Transfer
                                dataSource={transferArray}
                                targetKeys={newtransferArray}
                                showSearch
                                operations={['加入', '退出']}
                                onChange={transferArrayChange}
                                listStyle={{ width: 197.7, height: 250 }}
                                titles={['全部模块', '已选模块']}
                                render={item => item.title}
                            />
                        )}
                    </FormItem>
                    {getFieldValue('resType') == '1' ?
                        <FormItem
                            label="营销模块"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('zsbModulesId', {
                            })(
                                <Transfer
                                    dataSource={addOrEditSaasPackageransferAllContent}
                                    targetKeys={addOrEditSaasPackageTransferTargetContent}
                                    showSearch
                                    operations={['加入', '退出']}
                                    onChange={AddOrEditFormActivityTransferhandleChange}
                                    listStyle={{ width: 197.7, height: 250 }}
                                    titles={['全部模块', '已选模块']}
                                    render={item => item.title}
                                />
                            )}
                        </FormItem>
                        : null}
                    <FormItem
                        label="备注"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('intro', {
                            initialValue: addOrEditSaasPackageModalType == 'edit' && addOrEditSaasPackageModalData.intro ? addOrEditSaasPackageModalData.intro + '' : undefined,
                        })(
                            <Input type="textarea" placeholder='请填写简介' rows={4} />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(SaasPackageManageAddOrEditModal);
