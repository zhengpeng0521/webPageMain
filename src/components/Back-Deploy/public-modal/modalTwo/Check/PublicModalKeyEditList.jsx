import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Button, Upload, Icon, Select, message,Table,Popconfirm } from 'antd';
import style from '../../publicModal.less';

const FormItem = Form.Item;

const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

//模板2项目测评列表
const PublicModalKeyEditList = ({
    loading, formType,
    listCommentModalTwo,totalCommentModalTwo,
    pageCommentSizeModalTwo,pageCommentIndexModalTwo,
    formLoading,commentEditListVisibleModalTwo,
    tableOnChange,tableCommentPageChangeModalTwo,
    modalTwoFormCommentEditCancel,
    modalTwoTableOnCommentEditItem,
    modalTwoTableOnCommentDeleteItem,
    modalTwoTableOnCreateComment,
    commentModalTitleModalTwo,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

const columns = [{
    title: '项目编号',
    dataIndex: 'id',
    key: 'id',
    width: 50,
  }, {
    title: '项目名称',
    dataIndex: 'articleName',
    key: 'articleName',
    width: 50,
  }, {
    title: '项目URL',
    dataIndex: 'articleUrl',
    key: 'articleUrl',
    width: 100,
    render:(text,record) => (<div><a href={text} target='_blank' className={style.check}>{text}</a></div>),
  }, {
    width: 50,
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a className={style.check} onClick={() => modalTwoTableOnCommentEditItem(record)}>编辑</a>&nbsp;&nbsp;
        <Popconfirm title={deleteContent(record)} onConfirm={() => modalTwoTableOnCommentDeleteItem(record.id)}>
            <a className="common-table-item-bar" style={{color:'red'}}>删除</a>
        </Popconfirm>
      </p>
    ),
  }];

    //删除气泡框确认框内容
    let deleteContent = function(record){
        return(<p>确定删除<strong>测评项目</strong><strong style={{color:'red'}}>《{record.articleName}》</strong>吗?</p>);
    }
    //表单名称
    function titleName(commentModalTitleModalTwo){
        if(commentModalTitleModalTwo){
            return(<p>关键词&nbsp;&nbsp;<span style={{color:'red'}}>{commentModalTitleModalTwo}</span>&nbsp;&nbsp;下所有测评项目</p>);
        }
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        modalTwoFormCommentEditCancel();
    };

    let paginationProps = {
        total: totalCommentModalTwo,
        showSizeChanger: true,
        showQuickJumper :true,
        onShowSizeChange : tableCommentPageChangeModalTwo,
        onChange : tableCommentPageChangeModalTwo,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    };

    let modalOpts = {
        title: titleName(commentModalTitleModalTwo),
        maskClosable : false,
        visible : commentEditListVisibleModalTwo,
        closable : true,
        width : 800,
        onCancel : handleCancel,
        footer : [
            <Button key="cancle" type="primary" size="large" onClick={handleCancel}>关闭</Button>,
        ],
    };

    let aaa=[];
    for(let i=0;i<15;i++){
        aaa.push({
            id:i,
            title:`一头猪${i}`,
            url:`${i}${i}${i}${i}${i}${i}`,
        });
    }

  return (
    <div className={style.PublicModalTopicEditList}>
        <Modal {...modalOpts}>
            <Button type="primary" onClick={modalTwoTableOnCreateComment} className={style.addBtn}><Icon type="plus" />新增测评项目</Button>
            <Table
            columns={columns}
            dataSource={listCommentModalTwo}
            loading={loading}
            pagination={paginationProps}
            onChange={tableOnChange}
            bordered
            rowKey="id"
            scroll={{ x : 700 }} />
        </Modal>
    </div>

  );
};

PublicModalKeyEditList.propTypes = {
    loading : PropTypes.any,
    list: PropTypes.array,
    totalCommentModalTwo : PropTypes.any,
    pageTopicIndexModalOne : PropTypes.any,
    pageTopicSizeModalOne : PropTypes.any,
    selectedRowKeys : PropTypes.any,
    selectRows : PropTypes.any,
    tableOnChange : PropTypes.any,
    commentModalTitleModalTwo : PropTypes.any,
    tableArticlePageChangeModalOne : PropTypes.func,
    topicEditListVisibleModalOne : PropTypes.any,
    formLoading : PropTypes.any,
    modalTwoTableOnCommentEditItem : PropTypes.func,
    modalTwoTableOnCommentDeleteItem : PropTypes.func,
    modalTwoFormCommentEditCancel : PropTypes.func,
    modalTwoTableOnCreateComment : PropTypes.func,
    tableCommentPageChangeModalTwo : PropTypes.func,
};

export default Form.create()(PublicModalKeyEditList);
