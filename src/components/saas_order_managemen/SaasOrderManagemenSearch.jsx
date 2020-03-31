import React, { PropTypes } from 'react';
import { Form, Input, Button, Icon, Select, DatePicker } from 'antd';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const SaasOrderManagemenSearch = ({
    SearchSubmit,
    SearchClear,
    saasPackageOpeningSearchData,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
    },
}) => {
    // console.log(saasPackageOpeningSearchData)
    function handleSearchSubmit(e) {
        e.preventDefault();
        validateFields((errors, values) => {
            if (!!errors) {
                return;
            }

            let data = getFieldsValue();
            if (data.status == '待审核') {
                data.status = 3
            }
            let startDate, endDate;
            if (data.rangePicker) {
                startDate = (data.rangePicker)[0].format('YYYY-MM-DD');
                endDate = (data.rangePicker)[1].format('YYYY-MM-DD');
            } else {
                startDate = undefined;
                endDate = undefined;
            }

            delete data.rangePicker;
            data.startDate = startDate;
            data.endDate = endDate;
            // console.log(data)
            // return
            SearchSubmit(data);
        });
    }
    function handleSearchClear(e) {
        e.preventDefault();
        resetFields();
        SearchClear();
    }
    return (
        <Form layout={'inline'} className="common-search-form" >
            <div className="search-content">
                <div className="search-item">
                    {getFieldDecorator('orderNo')(
                        <Input placeholder="订单号" />
                    )}
                </div>
                <div className="search-item">
                    {getFieldDecorator('orgName')(
                        <Input placeholder="机构名称" />
                    )}
                </div>
                <div className="search-item">
                    {getFieldDecorator('orgId')(
                        <Input placeholder="机构ID" />
                    )}
                </div>
                <div className="search-item">
                    {getFieldDecorator('status', {
                        initialValue: saasPackageOpeningSearchData.status == 3 ? "待审核" : undefined,
                    })(
                        <Select placeholder="状态" style={{ width: 140 }}>
                            <Option value="" >全部状态</Option>
                            <Option value="0">待支付</Option>
                            <Option value="3" >待审核</Option>
                            <Option value="4" >审核未通过</Option>
                            <Option value="1" >订单已取消</Option>
                            <Option value="2" >订单已过期</Option>
                            <Option value="5" >订购成功</Option>
                        </Select>
                    )}
                </div>
                <div className="search-item">
                    {getFieldDecorator('rangePicker')(
                        <RangePicker
                            format="YYYY-MM-DD"
                            placeholder={['开始时间', '结束时间']}
                        />
                    )}
                </div>
                <div className="search-item">
                    <Button type="primary" onClick={handleSearchSubmit}><Icon type="search" />搜索</Button>
                    <Button onClick={handleSearchClear}><Icon type="delete" />清除</Button>
                </div>
            </div>
        </Form>
    );
}
export default Form.create()(SaasOrderManagemenSearch);