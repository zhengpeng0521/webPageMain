import {
	/*模块与菜单管理*/
	GetModularList,         /*获取模块列表*/
	GetMenuList,            /*获取菜单列表数据*/
	AddNewModular,          /*添加模块*/
	EditExistModular,       /*编辑模块更新版本*/
	EditExistModularNotUpdate,      /*编辑模块不更新版本*/

	/*套餐管理*/
	GetPackageList,         /*获取套餐列表数据*/
	AddNewPackage,          /*新增套餐*/
	EditExistPackage,       /*编辑套餐*/
	SaasPackageUpOrDown,    /*套餐改变上下架状态*/


	/*套餐开通管理*/
	GetPackingOpening,      /*获取套餐开通列表数据*/
	SetPackageOpeningType,  /*套餐列表改变状态*/
	GetPackageSelectList,   /*打开表单获取套餐列表作为下拉列表数据*/
	GetOrgDetail,           /*通过机构名称或者手机号获取机构信息*/
	GetTenantDetail,        /*通过租户信息搜索租户*/
	GetOrgByTenantId,       /*通过租户搜索机构*/
	OpeningPackage,         /*开通套餐*/
	mealContentModel,       /*套餐设置查询套餐名称模版*/
	showMarketingPackageListAll,           /*查看套餐内包含模板*/
} from '../../services/SaasPackageManage/SaasPackageManage';

import {
	showMarketingPackageList,      /*营销套餐列表展示*/
	checkIncludingModal,           /*查看套餐内包含模板*/
	packageChangeStatus,           /*上下架*/
	openAddPackageModal,           /*打开新增套餐modal获取穿梭框左边所有数据*/
	openEditPackageModal,          /*打开编辑套餐modal获取穿梭框左右两边所有数据*/
	weiXinPackageAfterOperation,   /*上下架和编辑后的列表展示*/
	addPackageSubmit,              /*新增提交*/
	editPackageSubmit,             /*编辑提交*/
	queryPackageMoule,              /*查询模板或实例*/
	tableWeiXinPackageUpdateBuyRecord,   /*更新购买记录*/
} from '../../services/SaasWeixinMarketing/SaasWeiXinMarketingPackage';
//import * as ser from '../../services/SaasWeixinMarketing/SaasWeixinMarketingModelSet';
import { parse } from 'qs';
import { message } from 'antd';
// import console = require('console');

//实例管理
export default {

	namespace: 'saasPackageManage',

	state: {
		moduleName: "",                                      //点击弹窗名称
		/*Saas模块管理*/
		/*模块列表*/
		modularResType: '1',                              //模块类型(1机构/2总部)
		modularListLoading: false,                         //模块列表加载状态
		allModularList: [],                                //模块列表数据
		wetherSelectModularItem: '',                       //选中模块的索引项
		modularSelectedProps: {},                          //选中的模块所拥有的属性

		/*新增编辑模块modal*/
		addOrEditSaasModularModalType: '',                 //模块管理新增修改类型('add'/'edit')
		addOrEditSaasModularModalVisible: false,           //模块管理modal是否显示
		addOrEditSaasModularModalData: {},                 //模块管理编辑时回填数据
		addOrEditSaasModularButtonLoading: false,          //模块管理按钮是否加载状态

		/*菜单列表*/
		menuListLoading: false,                            //菜单加载状态
		allMenuList: [],                                   //菜单列表内容
		menuCheckedArray: [],                              //选中的菜单
		secondListArray: [],                               //打开的树结构(默认是二级菜单)

		/*Saas套餐管理*/
		/*套餐管理搜索栏*/
		saasPackageManageSearchVisible: true,              //搜索栏是否展示
		saasPackageManageSearchData: {},                   //搜索栏搜索数据

		/*套餐管理列表*/
		saasPackageManagePageIndex: 0,                     //套餐页码
		saasPackageManagePageSize: 10,                     //套餐每页条数
		saasPackageManageTableData: [],                    //套餐管理列表数据
		saasPackageManagetotal: undefined,                 //套餐管理列表条数
		saasPackageManageLoading: false,                   //套餐管理列表加载状态

		/*查看套餐包含模块*/
		saasPackageCheckVisible: false,                    //查看包含模块modal显示
		saasPackageCheckIncludeData: [],                   //查看包含模块数据
		checkModalContentData: [],
		/*套餐管理新增编辑套餐*/
		addOrEditSaasPackageModalType: '',                 //套餐管理新增修改类型('add'/'edit')
		addOrEditSaasPackageModalVisible: false,           //套餐管理modal是否显示
		addOrEditSaasPackageModalData: {},                 //套餐管理编辑时回填数据
		addOrEditSaasPackageButtonLoading: false,          //套餐管理按钮是否加载状态
		addOrEditSaasPackageransferAllContent: [],         //穿梭框内所有模板的值
		addOrEditSaasPackageTransferTargetContent: [],     //穿梭框所选中的模板
		transferArray: [],
		newtransferArray: [],
		/*Saas套餐开通*/
		/*套餐开通搜索栏*/
		saasPackageOpeningSearchVisible: true,             //搜索栏是否展示
		saasPackageOpeningSearchData: {},                  //搜索栏搜索数据

		/*套餐开通列表*/
		saasPackageOpeningPageIndex: 0,                    //套餐页码
		saasPackageOpeningPageSize: 10,                    //套餐每页条数
		saasPackageOpeningTableData: [],                   //套餐管理列表数据
		saasPackageOpeningTotal: undefined,                //套餐管理列表条数
		saasPackageOpeningLoading: false,                  //套餐管理列表加载状态

		/*套餐开通表单*/
		saasPackageOpeningModalVisible: false,              //modal是否显示
		saasPackageOpeningModalButtonLoading: false,        //modal按钮是否在加载状态
		saasPackageOpeningModalSearchType: '1',             //机构搜索方式(0按机构和机构手机号/1按租户查询)
		saasPackageOpeningModalTenantSelectVisible: false,  //租户下拉列表是否显示(搜素租户之后才显示)
		saasPackageOpeningModalTenantSelectContent: [],     //租户下拉列表数据
		saasPackageOpeningModalSelectContent: [],           //套餐列表数据
		saasPackageOpeningModalOrgArray: [],                //接口获取的机构原始数据
		saasPackageOpeningModalTransferAllcontent: [],      //机构穿梭框左边数据
		saasPackageOpeningModalTransferTargetContent: [],   //机构穿梭框右边数据

		checkModalContent: [],         //点击'包含模版'获取到的值
		checkModalVisible: false,      //点击'包含模版'下内容是弹窗是否显示
		checkModalNoDefaultExpandedKeys: [],  //查看模板数量默认树状展示
		checkModalNoDefaultExpandedKeysleft: [],

		//营销套餐

		searchVisible: true,           //搜索框是否显示
		searchData: {},                //搜索内容

		pageSize: 10,                  //每页展示条目数
		pageIndex: 0,                  //页码
		loading: false,                //列表是否加载状态
		total: 0,                      //列表总数
		list: [],                      //列表内容

		checkModalVisible: false,      //点击'包含模版'下内容是弹窗是否显示



		addOrEditFormType: 'add',      //新增编辑modal 'create'/'edit'
		addOrEditFormVisible: false,   //新增编辑modal是否显示
		addOrEditButtonLoading: false, //新增编辑modal提交时按钮是否加载状态
		addOrEditFormData: {},         //编辑表单是带出的表单默认内容
		addOrEditFormActivityTransferAllContent: [],        //微信活动穿梭框左边传单内容
		addOrEditFormActivityTransferTargetContent: [],     //微信活动穿梭框右边传单内容
		addOrEditFormAdminiTransferAllContent: [],        //微信活动穿梭框左边传单内容------------------------------
		addOrEditFormAdminiTransferTargetContent: [],     //微信活动穿梭框右边传单内容-----------------------------
		addOrEditFormGameTransferAllContent: [],            //微信游戏穿梭框左边传单内容
		gameModuleFilterKeyWord: '',
		selectData: [],                                     //微信游戏已选
		isSelectAllLimitNum: false, //是否全选了限制人数
		isSelectAllLimit: false,//是否全选了不限制人数
		isSelectAllChartBox: false,//是否全选了开通社交图谱
		selectLimitNumBoxNum: null,//选择限制人数的数量
		selectChartBoxNum: null,//选择社交图谱的数量
		allPrivilegeNum: null,//特权的总数量

		selectedRowKeys: [],

		attrDataLimit: 0,

		addOrEditFormGameTransferTargetContent: [],         //微信游戏穿梭框右边传单内容
		addOrEditFormOfflineLeafletsTransferAllContent: [],            //线下传单穿梭框左边传单内容
		addOrEditFormOfflineLeafletsTransferTargetContent: [],         //线下传单穿梭框右边传单内容

		selectedLimitY: '',//已选限制
		selectedLimitN: '',//已选不限制
		numValue: 1,
		selectedChart: '',
		text: "",
		chartLimit: "",
		stateVue: [],
		selectPackageName: [] // 选中的套餐

	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				if (location.pathname === '/saas_package_mgr') {
					/*获取模块列表*/
					// dispatch({
					//     type: 'GetModularList',
					//     payload: {
					//         resType: '1'
					//     }
					// });

					/*获取套餐列表数据*/
					dispatch({
						type: 'GetPackageList',
						payload: {
							pageIndex: 0,
							pageSize: 10
						}
					});

					/*获取套餐开通列表*/
					dispatch({
						type: 'GetPackingOpening',
						payload: {
							pageIndex: 0,
							pageSize: 10
						}
					});

					dispatch({
						type: 'showMarketingPackageList',
						payload: {

							pageIndex: 0,
							pageSize: 10,
						}
					});

					// dispatch({
					//     type: 'showMarketingPackageListAll',
					//     payload: {

					//         pageIndex: 0,
					//         pageSize: 9999,
					//     }
					// });
				}
			});
		},
	},

	effects: {
		// 新增套餐总部模块展示
		*'GetModularList'({ payload }, { call, put, select }) {
			yield put({ type: 'showModularLoading' });
			let saasPackageManage = yield select(state => state.saasPackageManage);
			let modularResType = !!payload && !!payload.resType ? payload.resType : saasPackageManage.modularResType;
			let params = { ...payload, resType: modularResType };
			let { ret } = yield call(GetModularList, parse(params));
			if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
				let results = ret.results;

				if (results.length > 0) {
					let transferArray = [];
					for (let j in results) {
						transferArray.push({
							key: results[j].id,
							title: results[j].name,
						})
					}
					yield put({
						type: 'updateState',
						payload: {
							transferArray: transferArray,
							// addOrEditSaasPackageransferAllContent: transferArray,  //穿梭框中左边所有的值
							allModularList: results,
							wetherSelectModularItem: 0,          //选中项索引(后台按照修改时间倒序，所以默认进入和操作完成之后索引都在第一项)
							modularSelectedProps: results[0],    //选中项模块的属性(后台按照修改时间倒序，所以操作完成之后索引都在第一项)
							modularResType,
						}
					});
				} else {
					yield put({
						type: 'updateState',
						payload: {
							transferArray: [], //穿梭框中左边所有的值
							allModularList: results,                   //results是空数组
							wetherSelectModularItem: '',               //选中项索引(后台按照修改时间倒序，所以默认进入和操作完成之后索引都在第一项)
							modularSelectedProps: {},                  //选中项模块的属性(后台按照修改时间倒序，所以操作完成之后索引都在第一项)
							modularResType
						}
					});
				}





			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
			yield put({ type: 'closeModularLoading' });
		},
		/*营销套餐列表展示*/
		*'showMarketingPackageList'({ payload }, { call, put, select }) {
			yield put({ type: 'showLoading' });

			const { ret, err } = yield call(showMarketingPackageList, parse(payload));


			if (ret && ret.errorCode === 9000) {

				delete payload.pageIndex;
				delete payload.pageSize;
				// console.log(ret.results)

				yield put({
					type: 'updateState',
					payload: {
						list: ret.results,
						total: ret.data.resultCount,
						pageSize: ret.data.pageSize || 10,                   //每页展示条目数
						pageIndex: ret.data.pageIndex || 0,                 //页码
						searchData: payload
					}
				});
			} else {
				ret && ret.errorMessage && message.error(ret.errorMessage);
			}
			yield put({ type: 'closeLoading' });
		},
		*'showMarketingPackageListAll'({ payload }, { call, put, select }) {
			yield put({ type: 'showModularLoading' });
			let saasPackageManage = yield select(state => state.saasPackageManage);

			let modularResType = !!payload && !!payload.resType ? payload.resType : saasPackageManage.modularResType;
			// console.log(modularResType)

			let params = { ...payload, resType: modularResType };
			let { ret } = yield call(showMarketingPackageListAll, parse(params));
			// console.log(ret)
			if (ret && ret.errorCode === 9000) {
				let results = ret.results;
				if (results.length > 0) {
					let transferArray = [];
					for (let j in results) {
						transferArray.push({
							key: results[j].id,
							title: results[j].title,
						})
					}
					yield put({
						type: 'updateState',
						payload: {
							addOrEditSaasPackageransferAllContent: transferArray,  //穿梭框中左边所有的值
							allModularList: results,
							wetherSelectModularItem: 0,          //选中项索引(后台按照修改时间倒序，所以默认进入和操作完成之后索引都在第一项)
							modularSelectedProps: results[0],    //选中项模块的属性(后台按照修改时间倒序，所以操作完成之后索引都在第一项)
							modularResType
						}
					});
					// yield put({
					//     type: 'GetMenuList',
					//     payload: {
					//         id: results[0].id,
					//         resType: payload && payload.resType || undefined
					//     }
					// });
				} else {
					yield put({
						type: 'updateState',
						payload: {
							addOrEditSaasPackageransferAllContent: [], //穿梭框中左边所有的值
							allModularList: results,                   //results是空数组
							wetherSelectModularItem: '',               //选中项索引(后台按照修改时间倒序，所以默认进入和操作完成之后索引都在第一项)
							modularSelectedProps: {},                  //选中项模块的属性(后台按照修改时间倒序，所以操作完成之后索引都在第一项)
							modularResType
						}
					});
					// yield put({
					//     type: 'GetMenuList',
					//     payload: {
					//         id: '',
					//         resType: payload && payload.resType || undefined
					//     }
					// });
				}
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
			yield put({ type: 'closeModularLoading' });
		},
		/*查看套餐包含模板*/
		*'checkIncludingModal'({ payload }, { call, put, select }) {

			const { ret, err } = yield call(checkIncludingModal, parse(payload));
			if (ret && ret.errorCode === 9000) {
				let expandedKeys = [];
				for (let i in (ret.results[0])) {
					expandedKeys.push(i);
				}
				// console.log(ret.results[0])
				yield put({
					type: 'updateState',
					payload: {
						checkModalVisible: true,
						checkModalContent: ret.results[0],
						checkModalNoDefaultExpandedKeys: expandedKeys,
					}
				});
			} else {
				ret && ret.errorMessage && message.error(ret.errorMessage);
			}
		},

		/*上下架*/
		*'packageChangeStatus'({ payload }, { call, put, select }) {
			yield put({ type: 'showLoading' });
			const { ret, err } = yield call(packageChangeStatus, parse(payload));
			if (ret && ret.errorCode === 9000) {
				message.success(ret.errorMessage);
				yield put({
					type: 'weiXinPackageAfterOperation',
				});
			} else {
				ret && ret.errorMessage && message.error(ret.errorMessage);
			}
			yield put({ type: 'closeLoading' });
		},

		/*新增套餐时打开新增表单并且获取所有套餐*/
		*'openAddPackageModal'({ payload }, { call, put, select }) {
			const { ret, err } = yield call(openAddPackageModal, parse(payload));
			if (ret && ret.errorCode === 9000) {
				let activityResult = [];
				let flyerResult = [];
				let gameResult = [];
				let offlineLeafletsResult = [];
				for (let i in (ret.results)[0].weAct) {
					activityResult.push({
						title: ((ret.results)[0].weAct)[i].title,
						key: ((ret.results)[0].weAct)[i].id,
						categoryId: ((ret.results)[0].weAct)[i].categoryId,
					});
				}

				for (let i in (ret.results)[0].weAdm) {
					activityResult.push({
						title: ((ret.results)[0].weAdm)[i].title,
						key: ((ret.results)[0].weAdm)[i].id,
						categoryId: ((ret.results)[0].weAdm)[i].categoryId,
					});
				}

				let allPrivilegeNum = 0;

				(ret.results)[0].weGame && (ret.results)[0].weGame.map(function (item, index) {
					let obj = {
						title: item.title,
						key: item.id,
						categoryId: item.categoryId
					};

					let privilege_str = item.privilege || '';
					if (privilege_str && privilege_str.length > 0) {
						obj.isLimit = true;
					}
					gameResult.push(obj);

				})

				for (let s in (ret.results)[0].weOfflineLeaflet) {
					offlineLeafletsResult.push({
						title: ((ret.results)[0].weOfflineLeaflet)[s].title,
						key: ((ret.results)[0].weOfflineLeaflet)[s].id,
						categoryId: ((ret.results)[0].weOfflineLeaflet)[s].categoryId,
					});
				}

				yield put({
					type: 'updateState',
					payload: {

						addOrEditFormType: 'add',
						addOrEditFormVisible: true,
						addOrEditButtonLoading: false,
						addOrEditFormData: {},
						addOrEditFormActivityTransferAllContent: activityResult,
						addOrEditFormActivityTransferTargetContent: [],
						addOrEditFormAdminiTransferAllContent: activityResult,//-----------------------
						addOrEditFormAdminiTransferTargetContent: [],//--------------------------
						addOrEditFormGameTransferAllContent: gameResult,
						stateVue: gameResult,
						addOrEditFormGameTransferTargetContent: [],
						addOrEditFormOfflineLeafletsTransferAllContent: offlineLeafletsResult,
						addOrEditFormOfflineLeafletsTransferTargetContent: [],
						isSelectAllLimitNum: true,
						selectLimitNumBoxNum: allPrivilegeNum,
						selectChartBoxNum: 0,
						allPrivilegeNum,
					}
				});
			} else {
				ret && ret.errorMessage && message.error(ret.errorMessage);
			}
		},

		/*编辑套餐时打开编辑表单并且获取所有套餐*/
		*'openEditPackageModal'({ payload }, { call, put, select }) {

			const { ret, err } = yield call(openEditPackageModal);

			let keys = [], dataSource = [];

			//初始化选中的模板
			let modelArray_str = (payload && payload.modelArray) || '[]';
			let modelArray_arr = JSON.parse(modelArray_str);

			if (ret && ret.errorCode === 9000) {
				let activityResult = [];        //编辑时存取微信活动穿梭框左边Array
				let adminiResult = [];        //编辑时存取微信活动穿梭框左边Array---------------------------------
				let flyerResult = [];           //编辑时存取微信活动穿梭框左边Array
				let gameResult = [];            //编辑时存取微信活动穿梭框左边Array
				let offlineLeafletsResult = []; //编辑时存取线下传单穿梭框左边Array
				let allRightArray;              //编辑时存取当前列表项的所有Array
				let activityRightArray = [];    //编辑时存取微信活动穿梭框右边Array
				let adminiRightArray = [];    //编辑时存取微信活动穿梭框右边Array---------------------------
				let gameRightArray = [];        //编辑时存取微信游戏穿梭框右边Array
				let offlineRightLeafletsResult = []; //编辑时存取线下传单穿梭框左边Array
				for (let i in (ret.results)[0].weAct) {
					activityResult.push({
						title: ((ret.results)[0].weAct)[i].title,
						key: ((ret.results)[0].weAct)[i].id,
						categoryId: ((ret.results)[0].weAct)[i].categoryId,
					});
				}

				for (let i in (ret.results)[0].weAdm) {
					activityResult.push({
						title: ((ret.results)[0].weAdm)[i].title,
						key: ((ret.results)[0].weAdm)[i].id,
						categoryId: ((ret.results)[0].weAdm)[i].categoryId,
					});
				}
				let allPrivilegeNum = 0, recordCount = 0;

				//初始化微游戏的模板配置列表
				let game_module_list = (ret.results)[0].weGame;
				let game_module_select_data = [];

				game_module_list = game_module_list && game_module_list.length > 0 && game_module_list.map(function (item, index) {
					let obj = {
						title: item.title,
						key: item.id,
						categoryId: item.categoryId
					};

					let privilege_str = item.privilege || '';
					if (privilege_str && privilege_str.length > 0) {
						obj.isLimit = true;
					}

					return obj;
				});

				modelArray_arr && modelArray_arr.length > 0 && modelArray_arr.map(function (modelItem, modeIndex) {
					if (modelItem.categoryId == 3) {
						let game_module_select_data_item = {
							key: modelItem.id,
							id: modelItem.id,
						};
						let privilege_arr = modelItem.privilege || '';

						if (privilege_arr && privilege_arr.length > 0) {

							privilege_arr && privilege_arr.map(function (pitem, pindex) {

								if (pitem.name == 'numLimit') {
									if (pitem.data == '-1') {
										game_module_select_data_item.hasLimitNum = false;
									} else {
										game_module_select_data_item.hasLimitNum = true;

										game_module_select_data_item.hasLimitNumValue = pitem.data;
									}
								} else if (pitem.name = 'chart') {

									if (pitem.data == '1') {
										game_module_select_data_item.hasLimitEcharts = true
									} else {
										game_module_select_data_item.hasLimitEcharts = false;
									}
								}

							});

						}
						game_module_select_data.push(game_module_select_data_item);
					}
				});

				for (let s in (ret.results)[0].weOfflineLeaflet) {
					offlineLeafletsResult.push({
						title: ((ret.results)[0].weOfflineLeaflet)[s].title,
						key: ((ret.results)[0].weOfflineLeaflet)[s].id,
						categoryId: ((ret.results)[0].weOfflineLeaflet)[s].categoryId,
					});
				}

				if ((payload.modelArray).length > 0) {
					allRightArray = JSON.parse(payload.modelArray);
					for (let m in allRightArray) {
						if ('1' == allRightArray[m].categoryId) {
							activityRightArray.push(allRightArray[m].id);
						} else if ('3' == allRightArray[m].categoryId) {
							//之前保存的游戏Key--gameRightArray,对应数据allRightArray
							gameRightArray.push(allRightArray[m].id);
							//                            console.info(gameRightArray,"gameRightArray")
						} else if ('4' == allRightArray[m].categoryId) {
							offlineRightLeafletsResult.push(allRightArray[m].id);
						}
					}
					yield put({
						type: 'updateState',
						payload: {
							addOrEditFormActivityTransferTargetContent: activityRightArray,
							addOrEditFormAdminiTransferTargetContent: activityRightArray,//------------------
							//                            addOrEditFormGameTransferTargetContent: gameRightArray,
							addOrEditFormOfflineLeafletsTransferTargetContent: offlineRightLeafletsResult,
						}
					});
				} else {
					yield put({
						type: 'updateState',
						payload: {
							addOrEditFormActivityTransferTargetContent: [],
							addOrEditFormAdminiTransferTargetContent: [],//----------------------------
							//                            addOrEditFormGameTransferTargetContent: [],
							addOrEditFormOfflineLeafletsTransferTargetContent: [],
						}
					});
				}

				yield put({
					type: 'updateState',
					payload: {
						selectData: dataSource,
						selectedRowKeys: keys,
						attrDataLimit: allPrivilegeNum,
						addOrEditFormType: 'edit',
						addOrEditFormVisible: true,
						addOrEditButtonLoading: false,
						addOrEditFormData: payload,
						addOrEditFormActivityTransferAllContent: activityResult,
						addOrEditFormAdminiTransferAllContent: activityResult,//-------------------------
						addOrEditFormGameTransferAllContent: game_module_list,
						addOrEditFormGameTransferTargetContent: game_module_select_data,

						addOrEditFormOfflineLeafletsTransferAllContent: offlineLeafletsResult,
						selectLimitNumBoxNum: allPrivilegeNum,
						selectChartBoxNum: recordCount,
						allPrivilegeNum,
					}
				});
			} else {
				ret && ret.errorMessage && message.error(ret.errorMessage);
			}
		},

		/*新增提交*/
		*'addPackageSubmit'({ payload }, { call, put, select }) {
			yield put({ type: 'showLoading' });
			const { ret, err } = yield call(addPackageSubmit, parse(payload));

			if (ret && ret.errorCode === 9000) {
				message.success(ret.errorMessage);
				yield put({
					type: 'updateState',
					payload: {
						addOrEditFormVisible: false,
						addOrEditButtonLoading: false,
					}
				});
				yield put({
					type: 'weiXinPackageAfterOperation',
				});
			} else {
				ret && ret.errorMessage && message.error(ret.errorMessage);
			}
			yield put({ type: 'closeLoading' });
		},

		/*编辑提交*/
		*'editPackageSubmit'({ payload }, { call, put, select }) {
			yield put({ type: 'showLoading' });
			const { ret, err } = yield call(editPackageSubmit, parse(payload));
			if (ret && ret.errorCode === 9000) {
				message.success(ret.errorMessage);
				yield put({
					type: 'updateState',
					payload: {
						addOrEditFormVisible: false,
						addOrEditButtonLoading: false,
					}
				});
				yield put({
					type: 'weiXinPackageAfterOperation',
				});
			} else {
				ret && ret.errorMessage && message.error(ret.errorMessage);
			}
			yield put({ type: 'closeLoading' });
		},


		/*更新购买记录*/
		*'tableWeiXinPackageUpdateBuyRecord'({ payload }, { call, put, select }) {
			yield put({ type: 'showLoading' });
			const { ret, err } = yield call(tableWeiXinPackageUpdateBuyRecord, parse(payload));
			if (ret && ret.errorCode === 9000) {
				message.success(ret.errorMessage);
				yield put({
					type: 'weiXinPackageAfterOperation',
				});
			} else {
				ret && ret.errorMessage && message.error(ret.errorMessage);
			}
			yield put({ type: 'closeLoading' });
		},

		/*上下架和新增编辑后的列表展示*/
		*'weiXinPackageAfterOperation'({ payload }, { call, put, select }) {
			let weiXinMarketingPackage = yield select(state => state.weiXinMarketingPackage);
			let searchData = weiXinMarketingPackage.searchData || {};
			let pageIndex = weiXinMarketingPackage.pageIndex;
			let pageSize = weiXinMarketingPackage.pageSize;
			let params = { pageIndex, pageSize, ...searchData };
			const { ret, err } = yield call(weiXinPackageAfterOperation, parse(params));
			if (ret && ret.errorCode === 9000) {
				yield put({
					type: 'updateState',
					payload: {
						list: ret.results,
						total: ret.data.resultCount,
						pageSize: ret.data.pageSize || 10,                   //每页展示条目数
						pageIndex: ret.data.pageIndex || 0,                 //页码
					},
				});
			} else {
				ret && ret.errorMessage && message.error(ret.errorMessage);
			}
		},
		/*营销套餐列表展示*/

		/*套餐管理*/
		/*查看套餐包含模板*/
		*'checkIncludingModal'({ payload }, { call, put, select }) {

			const { ret, err } = yield call(checkIncludingModal, parse(payload));
			if (ret && ret.errorCode === 9000) {
				let expandedKeys = [];
				for (let i in (ret.results[0])) {
					expandedKeys.push(i);
				}
				// console.log(ret.results[0])
				yield put({
					type: 'updateState',
					payload: {
						checkModalVisible: true,
						checkModalContent: ret.results[0],
						checkModalNoDefaultExpandedKeys: expandedKeys,
					}
				});
			} else {
				ret && ret.errorMessage && message.error(ret.errorMessage);
			}
		},
		/*获取套餐列表数据*/
		*'GetPackageList'({ payload }, { put, call, select }) {
			yield put({ type: 'showTableLoading' });
			let { ret } = yield call(GetPackageList, parse(payload));
			// console.log(ret)
			if (ret && ret.errorCode === 0 || ret.errorCode === 9000) {
				delete payload.pageIndex;
				delete payload.pageSize;
				yield put({
					type: 'updateState',
					payload: {
						saasPackageManageTableData: ret.results,
						saasPackageManagetotal: ret.data.resultCount,
						saasPackageManagePageIndex: ret.data.pageIndex || 0,                    //套餐页码
						saasPackageManagePageSize: ret.data.pageSize || 10,                      //套餐每页条数
						saasPackageManageSearchData: payload
					}
				});
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
			yield put({ type: 'closeTableLoading' });
		},

		/*获取套餐列表数据(用于表单查询，无分页)*/
		// *'ModalGetPackageList'({ payload }, { put, call, select }) {
		//     yield put({ type: 'showTableLoading' });
		//     let { ret } = yield call(GetPackageList, parse(payload));
		//     if (ret && ret.errorCode === 9000) {
		//         let includeArray = [];

		//         for (let i in ret.results) {
		//             if (payload.passId == ret.results[i].id) {
		//                 includeArray = ret.results[i].moduleInfo;
		//                 // console.log(includeArray)
		//                 break;
		//             }
		//         }
		//         yield put({
		//             type: 'updateState',
		//             payload: {
		//                 saasPackageCheckVisible: true,
		//                 saasPackageCheckIncludeData: includeArray,
		//             }
		//         });
		//     } else if (ret && ret.errorMessage) {
		//         message.error(ret.errorMessage);
		//     } else {
		//         message.error('您的网络状况不佳，请检查您的网络');
		//     }
		//     yield put({ type: 'closeTableLoading' });
		// },

		*'ModalGetPackageList'({ payload }, { put, call, select }) {

			yield put({ type: 'showTableLoading' });
			let { ret } = yield call(mealContentModel, parse(payload));
			// console.log(ret)
			if (ret && ret.errorCode === 0 || ret.errorCode === 9000) {
				let expandedKeys = [];
				let expandedkeysleft = [];
				for (let i in (ret.modelArrayList)) {
					expandedKeys.push(i);
				}
				for (let i in (ret.results)) {
					expandedkeysleft.push(i);
				}
				yield put({
					type: 'updateState',
					payload: {
						saasPackageCheckVisible: true,
						saasPackageCheckIncludeData: ret.results,
						checkModalContentData: ret.modelArrayList,
						checkModalNoDefaultExpandedKeys: expandedKeys,
						checkModalNoDefaultExpandedKeysleft: expandedkeysleft,
					}
				});

			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
			yield put({ type: 'closeTableLoading' });
		},

		/*操作之后进行套餐列表查询*/
		*'AfterOperationQuery'({ payload }, { put, call, select }) {
			let saasPackageManage = yield select(state => state.saasPackageManage);
			let saasPackageManageSearchData = saasPackageManage.saasPackageManageSearchData || {};
			let pageIndex = saasPackageManage.saasPackageManagePageIndex;
			let pageSize = saasPackageManage.saasPackageManagePageSize;
			let params = { ...saasPackageManageSearchData, pageIndex, pageSize }
			let { ret } = yield call(GetPackageList, parse(params));
			if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
				//若删除操作后不是第一页且当页没有数据则发送请求前一页数据请求(虽然没有删除操作= =，尴尬)
				if ((ret.results).length == 0 && pageIndex > 0) {
					params.pageIndex = pageIndex - 1;
					let { ret } = yield call(GetPackageList, parse(params));
					if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
						delete params.pageIndex;
						delete params.pageSize;
						yield put({
							type: 'updateState',
							payload: {
								saasPackageManageTableData: ret.results,
								saasPackageManagetotal: ret.data.resultCount,
								saasPackageManagePageIndex: ret.data.pageIndex || 0,                    //套餐页码
								saasPackageManagePageSize: ret.data.pageSize || 10,                      //套餐每页条数
								saasPackageManageSearchData: params
							}
						});
					} else if (ret && ret.errorMessage) {
						message.error(ret.errorMessage);
					} else {
						message.error('您的网络状况不佳，请检查网络情况');
					}
				} else {
					delete params.pageIndex;
					delete params.pageSize;
					yield put({
						type: 'updateState',
						payload: {
							saasPackageManageTableData: ret.results,
							saasPackageManagetotal: ret.data.resultCount,
							saasPackageManagePageIndex: ret.data.pageIndex || 0,                    //套餐页码
							saasPackageManagePageSize: ret.data.pageSize || 10,                      //套餐每页条数
							saasPackageManageSearchData: params
						}
					});
				}
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
		},

		/*新增套餐*/
		*'AddNewPackage'({ payload }, { put, call, select }) {
			yield put({ type: 'showTableLoading', payload: { addOrEditSaasPackageButtonLoading: true } });
			let { ret } = yield call(AddNewPackage, parse(payload));
			// console.log(ret)
			if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {

				message.success(ret.errorMessage);
				yield put({
					type: 'updateState',
					payload: {
						addOrEditSaasPackageModalVisible: false
					}
				});
				yield put({
					type: 'AfterOperationQuery',
				});
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
			yield put({ type: 'closeTableLoading', payload: { addOrEditSaasPackageButtonLoading: false } });
		},

		/*编辑套餐*/
		*'EditExistPackage'({ payload }, { put, call, select }) {
			yield put({ type: 'showTableLoading', payload: { addOrEditSaasPackageButtonLoading: true } });
			let { ret } = yield call(EditExistPackage, parse(payload));
			if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
				message.success(ret.errorMessage);
				yield put({
					type: 'updateState',
					payload: {
						addOrEditSaasPackageModalVisible: false
					}
				});
				yield put({
					type: 'AfterOperationQuery',
				});
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
			yield put({
				type: 'closeTableLoading', payload: { addOrEditSaasPackageButtonLoading: false }
			});
		},

		/*套餐改变上下架状态*/
		*'SaasPackageUpOrDown'({ payload }, { put, call, select }) {
			yield put({ type: 'showTableLoading' });
			let { ret } = yield call(SaasPackageUpOrDown, parse(payload));
			if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
				message.success(ret.errorMessage);
				yield put({
					type: 'AfterOperationQuery',
				});
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
			yield put({ type: 'closeTableLoading' });
		},

		/*模板与菜单管理*/
		/*获取模块列表*/
		// *'GetModularList'({ payload }, { put, call, select }) {
		//     yield put({ type: 'showModularLoading' });
		//     let saasPackageManage = yield select(state => state.saasPackageManage);
		//     let modularResType = !!payload && !!payload.resType ? payload.resType : saasPackageManage.modularResType;
		//     let params = { ...payload, resType: modularResType };
		//     let { ret } = yield call(GetModularList, parse(params));
		//     if (ret && ret.errorCode === 9000) {
		//         let results = ret.results;
		//         if (results.length > 0) {
		//             let transferArray = [];
		//             for (let j in results) {
		//                 transferArray.push({
		//                     key: results[j].id,
		//                     title: results[j].name,
		//                 })
		//             }
		//             yield put({
		//                 type: 'updateState',
		//                 payload: {
		//                     addOrEditSaasPackageransferAllContent: transferArray,  //穿梭框中左边所有的值
		//                     allModularList: results,
		//                     wetherSelectModularItem: 0,          //选中项索引(后台按照修改时间倒序，所以默认进入和操作完成之后索引都在第一项)
		//                     modularSelectedProps: results[0],    //选中项模块的属性(后台按照修改时间倒序，所以操作完成之后索引都在第一项)
		//                     modularResType
		//                 }
		//             });
		//             yield put({
		//                 type: 'GetMenuList',
		//                 payload: {
		//                     id: results[0].id,
		//                     resType: payload && payload.resType || undefined
		//                 }
		//             });
		//         } else {
		//             yield put({
		//                 type: 'updateState',
		//                 payload: {
		//                     addOrEditSaasPackageransferAllContent: [], //穿梭框中左边所有的值
		//                     allModularList: results,                   //results是空数组
		//                     wetherSelectModularItem: '',               //选中项索引(后台按照修改时间倒序，所以默认进入和操作完成之后索引都在第一项)
		//                     modularSelectedProps: {},                  //选中项模块的属性(后台按照修改时间倒序，所以操作完成之后索引都在第一项)
		//                     modularResType
		//                 }
		//             });
		//             yield put({
		//                 type: 'GetMenuList',
		//                 payload: {
		//                     id: '',
		//                     resType: payload && payload.resType || undefined
		//                 }
		//             });
		//         }
		//     } else if (ret && ret.errorMessage) {
		//         message.error(ret.errorMessage);
		//     } else {
		//         message.error('您的网络状况不佳，请检查您的网络');
		//     }
		//     yield put({ type: 'closeModularLoading' });
		// },

		/*获取菜单树*/
		// *'GetMenuList'({ payload }, { put, call, select }) {
		//     yield put({ type: 'showMenuLoading' });
		//     let { ret } = yield call(GetMenuList, parse(payload));
		//     if (ret && ret.errorCode === 9000) {
		//         let array = [];
		//         for (let i in (ret.results)) {
		//             array.push(((ret.results)[i].id) + '');
		//         }
		//         yield put({
		//             type: 'updateState',
		//             payload: {
		//                 allMenuList: ret.results,
		//                 secondListArray: array,
		//                 //menuCheckedArray : payload.array,
		//                 addOrEditSaasModularButtonLoading: false,
		//                 addOrEditSaasModularModalVisible: false

		//             }
		//         });
		//         yield put({
		//             type: 'showRoleFuncs',
		//             payload: {
		//                 id: payload.id,
		//                 index: 0,
		//             }
		//         });
		//     } else if (ret && ret.errorMessage) {
		//         message.error(ret.errorMessage);
		//     } else {
		//         message.error('您的网络状况不佳，请检查您的网络');
		//     }
		//     yield put({ type: 'closeMenuLoading' });
		// },

		/*添加模块*/
		// *'AddNewModular'({ payload }, { put, call, select }) {
		//     yield put({ type: 'updateState', payload: { addOrEditSaasModularButtonLoading: true } });
		//     let { ret } = yield call(AddNewModular, parse(payload));
		//     if (ret && ret.errorCode === 9000) {
		//         message.success(ret.errorMessage);
		//         yield put({
		//             type: 'GetModularList',
		//         });
		//     } else if (ret && ret.errorMessage) {
		//         message.error(ret.errorMessage);
		//     } else {
		//         message.error('您的网络状况不佳，请检查您的网络');
		//     }
		//     yield put({ type: 'updateState', payload: { addOrEditSaasModularButtonLoading: false } });
		// },

		/*编辑模块更新版本*/
		// *'EditExistModular'({ payload }, { put, call, select }) {
		//     yield put({ type: 'updateState', payload: { addOrEditSaasModularButtonLoading: true } });

		//     let saasPackageManage = yield select(state => state.saasPackageManage);

		//     let { allMenuList, menuCheckedArray } = saasPackageManage;
		//     let dataFuncList = [];//往后台传递的菜单项

		//     function isCheck(item) {
		//         let resultFlg = false;
		//         //判断当前节点是否选中
		//         if (menuCheckedArray.findIndex((x) => { return x == item.id }) > -1) {
		//             resultFlg = true;
		//         }

		//         //是否有子节点
		//         if (item.list && item.list.length > 0) {
		//             let children = item.list;
		//             let flg_none = true;
		//             children && children.map(function (childItem) {
		//                 if (isCheck(childItem)) {
		//                     flg_none = false;
		//                 }
		//             });

		//             resultFlg = (!flg_none) || resultFlg;
		//         }

		//         if (resultFlg) {
		//             dataFuncList.push(item.id + '');
		//         }
		//         return resultFlg;
		//     }

		//     allMenuList && allMenuList.length > 0 && allMenuList.map(function (allItem) {
		//         isCheck(allItem);
		//     });

		//     payload.resources = dataFuncList.join(',');


		//     let { ret } = yield call(EditExistModular, parse(payload));
		//     if (ret && ret.errorCode === 9000) {
		//         message.success(ret.errorMessage);
		//         yield put({
		//             type: 'GetModularList',
		//         });
		//     } else if (ret && ret.errorMessage) {
		//         message.error(ret.errorMessage);
		//     } else {
		//         message.error('您的网络状况不佳，请检查您的网络');
		//     }
		//     yield put({ type: 'updateState', payload: { addOrEditSaasModularButtonLoading: false } });
		// },

		/*编辑模块不更新版本*/
		// *'EditExistModularNotUpdate'({ payload }, { put, call, select }) {
		//     yield put({ type: 'updateState', payload: { addOrEditSaasModularButtonLoading: true } });

		//     let saasPackageManage = yield select(state => state.saasPackageManage);

		//     let { allMenuList, menuCheckedArray } = saasPackageManage;
		//     let dataFuncList = [];//往后台传递的菜单项

		//     function isCheck(item) {
		//         let resultFlg = false;
		//         //判断当前节点是否选中
		//         if (menuCheckedArray.findIndex((x) => { return x == item.id }) > -1) {
		//             resultFlg = true;
		//         }

		//         //是否有子节点
		//         if (item.list && item.list.length > 0) {
		//             let children = item.list;
		//             let flg_none = true;
		//             children && children.map(function (childItem) {
		//                 if (isCheck(childItem)) {
		//                     flg_none = false;
		//                 }
		//             });

		//             resultFlg = (!flg_none) || resultFlg;
		//         }

		//         if (resultFlg) {
		//             dataFuncList.push(item.id + '');
		//         }
		//         return resultFlg;
		//     }

		//     allMenuList && allMenuList.length > 0 && allMenuList.map(function (allItem) {
		//         isCheck(allItem);
		//     });

		//     payload.resources = dataFuncList.join(',');


		//     let { ret } = yield call(EditExistModularNotUpdate, parse(payload));
		//     if (ret && ret.errorCode === 9000) {
		//         message.success(ret.errorMessage);
		//         yield put({
		//             type: 'GetModularList',
		//         });
		//     } else if (ret && ret.errorMessage) {
		//         message.error(ret.errorMessage);
		//     } else {
		//         message.error('您的网络状况不佳，请检查您的网络');
		//     }
		//     yield put({ type: 'updateState', payload: { addOrEditSaasModularButtonLoading: false } });
		// },

		/*套餐开通*/
		/*获取套餐开通列表*/
		*'GetPackingOpening'({ payload }, { put, call, select }) {
			yield put({ type: 'showOpeningLoading' });
			let { ret } = yield call(GetPackingOpening, parse(payload));
			if (ret && ret.errorCode === 0 || ret.errorCode === 9000) {
				// console.log(ret.results)
				yield put({
					type: 'updateState',
					payload: {
						saasPackageOpeningTableData: ret.results,
						saasPackageOpeningTotal: ret.data.resultCount,
						saasPackageOpeningPageIndex: ret.data.pageIndex || 0,
						saasPackageOpeningPageSize: ret.data.pageSize || 10,
					}
				});
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
			yield put({ type: 'closeOpeningLoading' });
		},

		/*列表套餐设置状态*/
		*'SetPackageOpeningType'({ payload }, { put, call, select }) {
			yield put({ type: 'showOpeningLoading' });
			let { ret } = yield call(SetPackageOpeningType, parse(payload));
			if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
				message.success(ret.errorMessage);
				yield put({
					type: 'AfteOpeningPackagerOperationQuery',
				});
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
			yield put({ type: 'closeOpeningLoading' });
		},

		/*通过机构名称或者手机号获取机构信息*/
		*'GetOrgDetail'({ payload }, { put, call, select }) {
			let { ret } = yield call(GetOrgDetail, parse(payload));
			if (ret && ret.errorCode == '9000') {
				let oragnArray = [];
				for (let i in (ret.results)) {
					if ((ret.results)[i].tel == '' || (ret.results)[i].tel == undefined || (ret.results)[i].tel == null) {
						oragnArray.push({
							title: (ret.results)[i].organName + '(未填写手机号,' + (ret.results)[i].id + ')',
							key: (ret.results)[i].id,
						});
					} else {
						oragnArray.push({
							title: (ret.results)[i].organName + '(' + (ret.results)[i].tel + ',' + (ret.results)[i].id + ')',
							key: (ret.results)[i].id,
						});
					}
				}
				yield put({
					type: 'updateState',
					payload: {
						saasPackageOpeningModalOrgArray: ret.results,
						saasPackageOpeningModalTransferAllcontent: oragnArray,
						saasPackageOpeningModalTransferTargetContent: [],
					}
				});
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
		},

		/*通过租户信息搜索租户*/
		*'GetTenantDetail'({ payload }, { put, call, select }) {
			let { ret } = yield call(GetTenantDetail, parse(payload));
			if (ret && ret.errorCode === 9000) {
				yield put({
					type: 'updateState',
					payload: {
						saasPackageOpeningModalTenantSelectVisible: true,
						saasPackageOpeningModalTenantSelectContent: ret.results,
					}
				});
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
		},

		/*操作之后进行套餐列表查询*/
		*'AfteOpeningPackagerOperationQuery'({ payload }, { put, call, select }) {
			let saasPackageManage = yield select(state => state.saasPackageManage);
			let saasPackageOpeningSearchData = saasPackageManage.saasPackageOpeningSearchData || {};
			let pageIndex = saasPackageManage.saasPackageOpeningPageIndex;
			let pageSize = saasPackageManage.saasPackageOpeningPageSize;
			let params = { ...saasPackageOpeningSearchData, pageIndex, pageSize, ...payload }
			let { ret } = yield call(GetPackingOpening, parse(params));
			if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
				//若删除操作后不是第一页且当页没有数据则发送请求前一页数据请求(虽然没有删除操作= =，尴尬)
				if ((ret.results).length == 0 && pageIndex > 0) {
					params.pageIndex = pageIndex - 1;
					let { ret } = yield call(GetPackingOpening, parse(params));
					if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
						yield put({
							type: 'updateState',
							payload: {
								saasPackageOpeningTableData: ret.results,
								saasPackageOpeningTotal: ret.data.resultCount,
								saasPackageOpeningPageIndex: ret.data.pageIndex || 0,
								saasPackageOpeningPageSize: ret.data.pageSize || 10,
							}
						});
					} else if (ret && ret.errorMessage) {
						message.error(ret.errorMessage);
					} else {
						message.error('您的网络状况不佳，请检查网络情况');
					}
				} else {
					yield put({
						type: 'updateState',
						payload: {
							saasPackageOpeningTableData: ret.results,
							saasPackageOpeningTotal: ret.data.resultCount,
							saasPackageOpeningPageIndex: ret.data.pageIndex || 0,
							saasPackageOpeningPageSize: ret.data.pageSize || 10,
						}
					});
				}
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
		},

		/*打开表单获取套餐列表作为下拉列表数据*/
		*'GetPackageSelectList'({ payload }, { put, call, select }) {
			let { ret } = yield call(GetPackageSelectList, parse(payload));
			if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
				yield put({
					type: 'updateState',
					payload: {
						saasPackageOpeningModalSelectContent: ret.results,
						saasPackageOpeningModalVisible: true,
					}
				});
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
		},

		/*通过租户搜索机构*/
		*'GetOrgByTenantId'({ payload }, { put, call, select }) {
			let { ret } = yield call(GetOrgByTenantId, parse(payload));
			if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
				let oragnArray = [];
				for (let i in (ret.results)) {
					if ((ret.results)[i].tel == '' || (ret.results)[i].tel == undefined || (ret.results)[i].tel == null) {
						oragnArray.push({
							title: (ret.results)[i].orgName + '(未填写手机号,' + (ret.results)[i].orgId + ')',
							key: (ret.results)[i].orgId,
						});
					} else {
						oragnArray.push({
							title: (ret.results)[i].orgName + '(' + (ret.results)[i].tel + ',' + (ret.results)[i].orgId + ')',
							key: (ret.results)[i].orgId,
						});
					}
				}
				yield put({
					type: 'updateState',
					payload: {
						saasPackageOpeningModalOrgArray: ret.results,
						saasPackageOpeningModalTransferAllcontent: oragnArray,
						saasPackageOpeningModalTransferTargetContent: [],
					}
				});
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
		},

		/*开通套餐*/
		*'OpeningPackage'({ payload }, { put, call, select }) {
			yield put({ type: 'showOpeningLoading', payload: { saasPackageOpeningModalButtonLoading: true } });
			let { ret } = yield call(OpeningPackage, parse(payload));
			if (ret && ret.errorCode === 9000 || ret.errorCode === 0) {
				message.success(ret.errorMessage);
				yield put({
					type: 'updateState',
					payload: {
						saasPackageOpeningModalVisible: false,
						saasPackageOpeningModalTenantSelectVisible: false,
						saasPackageOpeningModalSearchType: '1',
						saasPackageOpeningModalTenantSelectContent: [],
						saasPackageOpeningModalTransferAllcontent: [],      //机构穿梭框左边数据
						saasPackageOpeningModalTransferTargetContent: [],   //机构穿梭框右边数据
					}
				});
				yield put({ type: 'AfteOpeningPackagerOperationQuery', });
			} else if (ret && ret.errorMessage) {
				message.error(ret.errorMessage);
			} else {
				message.error('您的网络状况不佳，请检查您的网络');
			}
			yield put({ type: 'closeOpeningLoading', payload: { saasPackageOpeningModalButtonLoading: false, saasPackageOpeningModalSearchType: '1' } });
		},
	},

	reducers: {
		//更新state
		updateState(state, action) {
			// console.log(action.payload)
			return { ...state, ...action.payload };
		},
		/*套餐管理列表加载中*/
		showTableLoading(state, action) {
			return { ...state, ...action.payload, saasPackageManageLoading: true };
		},
		/*套餐管理列表取消加载中*/
		closeTableLoading(state, action) {
			return { ...state, ...action.payload, saasPackageManageLoading: false };
		},
		/*模块列表加载中*/
		showModularLoading(state, action) {
			return { ...state, ...action.payload, modularListLoading: true };
		},
		/*模块列表取消加载*/
		closeModularLoading(state, action) {
			return { ...state, ...action.payload, modularListLoading: false };
		},
		/*菜单列表加载中*/
		showMenuLoading(state, action) {
			return { ...state, ...action.payload, menuListLoading: true };
		},
		/*菜单列表取消加载*/
		closeMenuLoading(state, action) {
			return { ...state, ...action.payload, menuListLoading: false };
		},
		/*套餐开通列表加载中*/
		showOpeningLoading(state, action) {
			return { ...state, ...action.payload, saasPackageOpeningLoading: true };
		},
		/*套餐开通列表取消加载*/
		closeOpeningLoading(state, action) {
			return { ...state, ...action.payload, saasPackageOpeningLoading: false };
		},

		//根据角色编号渲染角色拥有的菜单项
		showRoleFuncs(state, action) {
			let { allMenuList, allModularList, } = state;
			let { id, index } = action.payload;

			let menuCheckedArray = [];
			let modularSelectedProps = {};

			allModularList && allModularList.length > 0 && allModularList.map(function (roleItem) {
				if (roleItem.id == id) {
					if (roleItem.resources && roleItem.resources != '' && roleItem.resources != null) {
						menuCheckedArray = roleItem.resources.split(',');
					}
					modularSelectedProps = roleItem;
				}
			});

			let treeFunctionList = [];                              //tree勾选的菜单选项

			let isCheck = function (specialMenu) {
				let resultFlg = false;
				//判断当前节点有没有被选中
				if (menuCheckedArray.findIndex(function (x) {
					return x == specialMenu.id;
				}) > -1) {
					//判断是否有子节点
					if (specialMenu.list) {
						let flg_all = true;     //是否所有子节点都被选中
						let flg_none = true;    //是否子节点一个都没有选中

						let children = specialMenu.list;

						children && children.length > 0 && children.map(function (childItem) {
							if (isCheck(childItem)) {
								flg_none = false;
							} else {
								flg_all = false;
							}
						});
						resultFlg = flg_all;
					} else {
						resultFlg = true;
					}
				}

				if (resultFlg) {
					treeFunctionList.push(specialMenu.id + '');
				}
				return resultFlg;
			}

			for (let i in allMenuList) {
				isCheck(allMenuList[i]);
			}

			return { ...state, menuCheckedArray: treeFunctionList, wetherSelectModularItem: index, modularSelectedProps };
		},


		//更新微游戏模板选中数据
		handleOnGameModuleConfigChange(state, action) {
			let { addOrEditFormGameTransferAllContent, addOrEditFormGameTransferTargetContent } = state;
			let { payload } = action;

			let { eventType, eventData } = payload;

			let new_gameModuleDataSource = [];

			//模板选中情况变更时
			if (eventType == 'moduleSelectChange') {
				eventData && eventData.map(function (eItem, eIndex) {

					let hasFind = false;
					addOrEditFormGameTransferTargetContent &&
						addOrEditFormGameTransferTargetContent.map(function (titem, tindex) {

							if (titem.key == eItem) {
								hasFind = true;
								new_gameModuleDataSource.push(titem);
							}
						});

					if (!hasFind) {

						//判断当前key是否是可配置内付费
						let itemCanLimit = false;
						addOrEditFormGameTransferAllContent && addOrEditFormGameTransferAllContent.length > 0 && addOrEditFormGameTransferAllContent.map(function (sourceItem, sourceIndex) {
							if (sourceItem.key == eItem) {
								itemCanLimit = sourceItem.isLimit ? true : false;
							}
						});

						if (itemCanLimit) {
							new_gameModuleDataSource.push({
								key: eItem,
								hasLimitNum: false,
								hasLimitNumValue: 1000,
								hasLimitEcharts: false,
							});
						} else {
							new_gameModuleDataSource.push({
								key: eItem,
							});
						}

					}
				});
			} else if (eventType == 'limitChange') {//更新选中数据的内付费配置
				let hasFind = false;
				addOrEditFormGameTransferTargetContent &&
					addOrEditFormGameTransferTargetContent.map(function (item, index) {
						if (item.key == eventData.key) {
							hasFind = true;
							item = {
								...item,
								...eventData,
							}
						}

						new_gameModuleDataSource.push(item);
					});

				if (!hasFind) {
					new_gameModuleDataSource.push(eventData);
				}
			}

			return { ...state, addOrEditFormGameTransferTargetContent: new_gameModuleDataSource };
		},

		// 营销模块



		showLoading(state, action) {
			return { ...state, ...action.payload, loading: true };
		},
		closeLoading(state, action) {
			return { ...state, ...action.payload, loading: false };
		},
		handleChangeLimitData(state, action) {

			let { stateVue } = state;
			let payload = action.payload;

			let stateVueCopy = JSON.parse(JSON.stringify(stateVue));

			stateVueCopy.map(function (statItem, stateindex) {
				if (statItem.key == payload.key) {

					let acyion_type = (payload && payload.type) || '';
					let acyion_data = (payload && payload.data) || '';

					if (acyion_type == 'isLimit') {
					} else if (acyion_type == 'limitNum') {
						statItem.chart = acyion_data;
					} else if (acyion_type == 'chart') {
						statItem.chart = acyion_data;
					}
				}
			});

			return { ...state, stateVue: stateVueCopy };
		},
		//微游戏模板配置 选中所有  限制人数
		handleSelectAllLimitNum(state, action) {
			let currentListKeys = action.payload.currentListKeys;
			let { addOrEditFormGameTransferAllContent, addOrEditFormGameTransferTargetContent } = state;

			let new_gameModuleDataSource = [];
			currentListKeys && currentListKeys.map(function (keyItem, keyIndex) {

				//判断当前key是否是可配置内付费
				let itemCanLimit = false;
				addOrEditFormGameTransferAllContent && addOrEditFormGameTransferAllContent.length > 0 && addOrEditFormGameTransferAllContent.map(function (sourceItem, sourceIndex) {
					if (sourceItem.key == keyItem) {
						itemCanLimit = sourceItem.isLimit ? true : false;
					}
				});

				if (!itemCanLimit) {
					return;
				}

				let hasFind = false;
				addOrEditFormGameTransferTargetContent &&
					addOrEditFormGameTransferTargetContent.map(function (titem, tindex) {
						if (titem.key == keyItem) {
							hasFind = true;
							new_gameModuleDataSource.push({
								...titem,
								hasLimitNum: true,
								hasLimitNumValue: titem.hasLimitNumValue || 1000,
							});
						}
					});

				if (!hasFind) {
					new_gameModuleDataSource.push({
						key: keyItem,
						hasLimitNum: true,
						hasLimitNumValue: 1000,
						categoryId: 3,
					});
				}

			});

			return { ...state, addOrEditFormGameTransferTargetContent: new_gameModuleDataSource };
		},

		//微游戏模板配置 选中所有  不限制人数
		handleSelectAllNoLimitNum(state, action) {
			let currentListKeys = action.payload.currentListKeys;
			let { addOrEditFormGameTransferAllContent, addOrEditFormGameTransferTargetContent } = state;

			let new_gameModuleDataSource = [];
			currentListKeys && currentListKeys.map(function (keyItem, keyIndex) {

				//判断当前key是否是可配置内付费
				let itemCanLimit = false;
				addOrEditFormGameTransferAllContent && addOrEditFormGameTransferAllContent.length > 0 && addOrEditFormGameTransferAllContent.map(function (sourceItem, sourceIndex) {
					if (sourceItem.key == keyItem) {
						itemCanLimit = sourceItem.isLimit ? true : false;
					}
				});

				if (!itemCanLimit) {
					return;
				}

				let hasFind = false;
				addOrEditFormGameTransferTargetContent &&
					addOrEditFormGameTransferTargetContent.map(function (titem, tindex) {
						if (titem.key == keyItem) {
							hasFind = true;
							new_gameModuleDataSource.push({
								...titem,
								hasLimitNum: false,
								hasLimitNumValue: titem.hasLimitNumValue || 1000,
							});
						}
					});

				if (!hasFind) {
					new_gameModuleDataSource.push({
						key: keyItem,
						hasLimitNum: false,
						hasLimitNumValue: 1000,
						categoryId: 3,
					});
				}

			});

			return { ...state, addOrEditFormGameTransferTargetContent: new_gameModuleDataSource };
		},

		//微游戏模板配置 选中所有  开通社交图谱
		handleSelectAllLimitEcharts(state, action) {
			let currentListKeys = action.payload.currentListKeys;
			let { addOrEditFormGameTransferAllContent, addOrEditFormGameTransferTargetContent } = state;
			let new_gameModuleDataSource = [];
			currentListKeys && currentListKeys.map(function (keyItem, keyIndex) {

				//判断当前key是否是可配置内付费
				let itemCanLimit = false;
				addOrEditFormGameTransferAllContent && addOrEditFormGameTransferAllContent.length > 0 && addOrEditFormGameTransferAllContent.map(function (sourceItem, sourceIndex) {
					if (sourceItem.key == keyItem) {
						itemCanLimit = sourceItem.isLimit ? true : false;
					}
				});

				if (!itemCanLimit) {
					return;
				}

				let hasFind = false;
				addOrEditFormGameTransferTargetContent &&
					addOrEditFormGameTransferTargetContent.map(function (titem, tindex) {
						if (titem.key == keyItem) {
							hasFind = true;
							new_gameModuleDataSource.push({
								...titem,
								hasLimitEcharts: true,
							});
						}
					});

				if (!hasFind) {
					new_gameModuleDataSource.push({
						key: keyItem,
						hasLimitEcharts: true,
					});
				}

			});

			return { ...state, addOrEditFormGameTransferTargetContent: new_gameModuleDataSource };
		},
	},
};
