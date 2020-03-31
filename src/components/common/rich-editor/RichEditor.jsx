import React from 'react';
import styles from './RichEditor.less';
import LzEditor from 'react-lz-editor';

class RichEditor extends React.Component{
    constructor(props){
		super(props);
        this.state = {
            html: props.value,
			imageList: [],
        }
		this.cbReceiver = this.cbReceiver.bind(this);
    }

    componentWillReceiveProps(nextProps) {
		if ('value' in nextProps) {
			let value = nextProps.value;
          	this.setState({
			  	html: value,
          	});
        }
    }


    componentWillUnmount() {
        this.setState({
            html: undefined,
        });
    }

    cbReceiver(content) {
			let index = content.indexOf('video')
			let controlsIndex = content.indexOf('controls')
			let newCon = ''
			if( controlsIndex == -1) {
				if(index > -1){
					let arr = content.split('<video')
					let flag = true
					arr.forEach((item, key) => {
							if(key === arr.length - 1){
								newCon += item
							} else {
								newCon += item + '<video controls'
							}
					})
				} else {
					newCon = content
				}
			}

			// 视频优化，截取一个vidao，但是还是有多个视频
			// let newConNewIndexof = newCon.indexOf('></video></p>') + 26
			// let newConNew = newCon.substr(0, newConNewIndexof)
			this.state.imageList=[];

    	this.setState({
    		html: newCon,
    		imageList: [],
    	});

    	this.props.onChange && this.props.onChange(newCon);
    }

    render() {

        let me = this;

    	let uploadProps = {
    		name: 'file',
		//	action: me.props.action || BASE_URL+'/systemController/upload',
					action: 'https://imgsrc.ishanshan.com/gimg/user/uploadex',
	        listType: 'picture',
	        // headers: {
	        //     authorization: 'authorization-text',
					// },
					data: {
						tid: 0,
						oid: 0
					},
	        accept: 'image/*',
	        fileList: me.state.imageList,
		  	onChange(info) {
			    let fileList = info.fileList;
			    let new_fileList = [];
			    fileList && fileList.length > 0 && fileList.map(function(item, index) {
			    	if(item.status === 'done' && item.response && item.response.data) {
			    		item.url = item.response.data.url;
			    	}
			    });

			    me.setState({
			    	imageList: fileList,
			    });
		  	},
    	};

        return (
            <div className="common_rich_editor_cont">
				<LzEditor
					active={false}
                	importContent={me.state.html}
                	cbReceiver={me.cbReceiver}
                	uploadProps={uploadProps}
                	image={true}
                	video={true}
          			audio={false}
					fullScreen={false}
					autoSave={false}
					alignment={true}
					convertFormat="html"
                />
            </div>
        )
    }
}

export default RichEditor;
