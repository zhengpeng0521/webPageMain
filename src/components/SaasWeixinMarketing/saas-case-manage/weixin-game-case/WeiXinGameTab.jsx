import React, { PropTypes } from 'react';
import { Tabs } from 'antd';
import styles from './WeiXinGameTab.less'
import QueueAnim from 'rc-queue-anim';
import WeiXinGameCaseSearch from './WeiXinGameCaseSearch'
import WeiXinGameNewCaseSearch from './WeiXinGameNewCaseSearch'
import WeiXinGameCaseList from './WeiXinGameCaseList'
import WeiXinGameNewCase from './WeiXinGameNewCase'
const { TabPane } = Tabs;
function WeiXinActivityTab({
  weiXinGameCaseSearchVisible,            //微信游戏搜索栏展示与否
  weiXinGameCaseSearchSelectContent,      //微信游戏模板名称下拉列表
  weiXinGameCaseSearchReset,              //清空数据
  weiXinGameCaseSearchSubmit,             //点击搜索
  schoolTypeList,                         //机构类型

  weiXinGameCasePageSize,                 //微信游戏页面数据数量
  weiXinGameCasePageIndex,                //微信游戏页码
  weiXinGameCaseLoading,                  //列表是否加载状态
  weiXinGameCaseList,                     //列表数据
  weiXinGameCaseTotal,                    //列表数据总数
  WeiXinGameFilter,                       //点击筛选
  WeiXinGameCasePageChange,               //分页筛选分类信息改变
  OpenPreviewModal,                       //列表点击预览
  WeiXinGameExportList,                   //按查询结果导出

  //新版微信游戏
  weiXinGameNewCaseSearchVisible,         //微信游戏搜索栏展示与否
  weiXinGameNewCaseSearchReset,           //清空数据
  weiXinGameNewCaseSearchSubmit,          //点击搜索

  weiXinGameNewCasePageSize,              //微信游戏页面数据数量
  weiXinGameNewCasePageIndex,             //微信游戏页码
  weiXinGameNewCaseList,                  //新版微信游戏列表数据
  weiXinGameNewCaseTotal,                 //新版微信游戏列表数据总数
  WeiXinGameNewFilter,                    //点击筛选
  WeiXinGameNewCasePageChange,            //分页筛选分类信息改变
  WeiXinGameNewExportList,                //按查询结果导出
  changeGameTabs,                          //tab改变
  gameType,                                //微信游戏 新版 1 老版 2
  }) {
    let weiXinGameSearchProps = {
      weiXinGameCaseSearchSelectContent,      //微信游戏模板名称下拉列表
      weiXinGameCaseSearchReset,              //清空数据
      weiXinGameCaseSearchSubmit,             //点击搜索
      schoolTypeList,                         //机构类型
      gameType                                //微信游戏 新版 1 老版 2
    }
    let weiXinGameListProps = {
      weiXinGameCasePageSize,                 //微信游戏页面数据数量
      weiXinGameCasePageIndex,                //微信游戏页码
      weiXinGameCaseLoading,                  //列表是否加载状态
      weiXinGameCaseList,                     //列表数据
      weiXinGameCaseTotal,                    //列表数据总数
      WeiXinGameFilter,                       //点击筛选
      WeiXinGameCasePageChange,               //分页筛选分类信息改变
      OpenPreviewModal,                       //列表点击预览
      WeiXinGameExportList,                   //按查询结果导出
    }
    let weiXinGameNewSearchProps = {
      weiXinGameCaseSearchSelectContent,      //微信游戏模板名称下拉列表
      weiXinGameCaseSearchReset : weiXinGameNewCaseSearchReset,           //清空数据
      weiXinGameCaseSearchSubmit : weiXinGameNewCaseSearchSubmit,          //点击搜索
      schoolTypeList,                         //机构类型
      gameType                                //微信游戏 新版 1 老版 2
    }
    let weiXinGameNewListProps = {
      weiXinGameCaseLoading,                  //列表是否加载状态
      weiXinGameNewCasePageSize,              //微信游戏页面数据数量
      weiXinGameNewCasePageIndex,             //微信游戏页码
      weiXinGameNewCaseList,                  //新版微信游戏列表数据
      weiXinGameNewCaseTotal,                 //新版微信游戏列表数据总数
      WeiXinGameNewFilter,                    //点击筛选
      WeiXinGameNewCasePageChange,            //分页筛选分类信息改变
      WeiXinGameNewExportList,                //按查询结果导出
      OpenPreviewModal,                       //列表点击预览
    }
    return (
        <div className={styles.activityTab}>
          <Tabs defaultActiveKey='1' onChange={changeGameTabs}>
            <TabPane tab="新版微信游戏" key="1">
            <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
                {weiXinGameNewCaseSearchVisible ? [
                  <WeiXinGameNewCaseSearch {...weiXinGameNewSearchProps} key="search_queue_weixinNewGame"/>
                ]:null}
              </QueueAnim>
              <WeiXinGameNewCase {...weiXinGameNewListProps} />
            </TabPane>
            <TabPane tab="老版微信游戏" key="2">
              <QueueAnim
                type={['top', 'top']}
                ease={['easeOutQuart', 'easeInOutQuart']}
                className="common-search-queue" >
                {weiXinGameCaseSearchVisible ? [
                  <WeiXinGameCaseSearch {...weiXinGameSearchProps} key="search_queue_weixinGame"/>
                ]:null}
              </QueueAnim>
              <WeiXinGameCaseList {...weiXinGameListProps} />
            </TabPane>
          </Tabs>
        </div>
  );
}


export default WeiXinActivityTab;
