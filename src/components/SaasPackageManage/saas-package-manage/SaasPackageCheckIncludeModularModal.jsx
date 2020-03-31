import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Tree, Spin, Row, Col } from 'antd';
// import console = require('console');
import styles from './SaasPackageManage.less';
const FormItem = Form.Item;
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

const SaasPackageCheckIncludeModularModal = ({
    moduleName,
    checkModalNoDefaultExpandedKeys,
    checkModalNoDefaultExpandedKeysleft,
    checkModalContentData,
    saasPackageCheckVisible,                    //查看包含模块modal显示
    saasPackageCheckIncludeData,                //查看包含模块数据
    SaasPackageCheckIncludeModalCancel,         //查看包含模块modal关闭
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
}) => {
    let weActChildren = [];
    let weFlyerChildren = [];
    let weGameChildren = [];
    let weOfflineLeafletsChildren = [];
    // console.log(checkModalContentData,saasPackageCheckIncludeData)
    if (checkModalContentData) {
        if (checkModalContentData.weAct && (checkModalContentData.weAct).length > 0) {
            weActChildren = (checkModalContentData.weAct).map((item) => {
                return (
                    <TreeNode title={item.title} key={item.id} className={styles.nodeText} />
                );
            });
        }
        if (checkModalContentData.weGame && (checkModalContentData.weGame).length > 0) {
            weGameChildren = (checkModalContentData.weGame).map((item) => {
                let privilege = item.privilege;
                if (privilege !== "") {
                    privilege = JSON.parse(item.privilege);
                    let limit_num_str = '不限制报名人数';
                    let limit_echarts_str = '未开通社交图谱';
                    privilege && privilege.map(function (item, index) {
                        if (item.name == 'numLimit') {
                            if (item.data == -1) {
                                limit_num_str = '不限制报名人数';
                            } else {
                                limit_num_str = '限制报名人数 ' + item.data;
                            }
                        }
                        if (item.name == 'chart') {
                            if (item.data == 1) {
                                limit_echarts_str = '开通社交图谱';
                            }
                        }
                    });
                    return (
                        <TreeNode title={item.title + ' (' + limit_num_str + ', ' + limit_echarts_str + ')'} key={item.id} className={styles.nodeText} />
                    );
                } else {
                    return (
                        <TreeNode title={item.title} key={item.id} className={styles.nodeText} />
                    );
                }
            });
        }
        if (checkModalContentData.weOfflineLeaflet && (checkModalContentData.weOfflineLeaflet).length > 0) {
            weOfflineLeafletsChildren = (checkModalContentData.weOfflineLeaflet).map((item) => {
                return (
                    <TreeNode title={item.title} key={item.id} className={styles.nodeText} />
                );
            });
        }
    }

    let showModular = [];
    if (saasPackageCheckIncludeData && saasPackageCheckIncludeData.length > 0) {
        showModular = saasPackageCheckIncludeData.map((item, index) => {
            return (
                <TreeNode title={item.name} key={index}>
                    {
                        item.list.map((items, indexs) => {
                            return (
                            <TreeNode title={items.name} key={indexs} className={styles.nodeText} />
                            )
                        })
                    }
                </TreeNode>
            );
        })
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        SaasPackageCheckIncludeModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: '套餐名称',
        maskClosable: false,
        visible: saasPackageCheckVisible,
        closable: true,
        width: 500,
        onCancel: handleCancel,
        footer: [
            <Button key="cancel" type="primary" size="default" onClick={handleCancel}>关闭</Button>
        ],
    };

    return (
        <div className='zj_modal_header'>


            <Modal {...modalOpts}>
                <div style={{ fontSize: '14px', color: '#000', paddingBottom: '16px' }}>套餐名称 :  {moduleName}</div>
                <div style={{ fontSize: '14px', color: '#000' }}>
                    <Row type="flex">
                        <Col span={12} style={{ width: '45%' }}>
                            包含菜单:
                         </Col>
                        <Col span={12} style={{ width: '45%', marginLeft: '10%' }}>
                            包含模板:
                         </Col>
                    </Row>
                </div>


                <div>
                    <Row type="flex" style={{ paddingTop: '16px' }}>
                        <Col span={12} style={{ width: '45%', border: '1px solid #000' }}>
                            <Tree showLine defaultExpandedKeys={checkModalNoDefaultExpandedKeysleft}>
                                {showModular || []}
                            </Tree>
                        </Col>
                        <Col span={12} style={{ width: '45%', border: '1px solid #000', marginLeft: '10%' }}>
                            {/* {showModular || []} */}
                            <Tree showLine defaultExpandedKeys={checkModalNoDefaultExpandedKeys}
                            >
                                <TreeNode title='微活动' key="weAct" >
                                    {weActChildren || []}
                                </TreeNode>
                                <TreeNode title='微游戏' key="weLeaflet" >
                                    {weGameChildren || []}
                                </TreeNode>
                                <TreeNode title='线下传单' key="offlineLeaflets" >
                                    {weOfflineLeafletsChildren || []}
                                </TreeNode>
                            </Tree>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    );
};

export default Form.create()(SaasPackageCheckIncludeModularModal);
