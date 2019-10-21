//import { PromizeCanvas } from "./promizeCanvas.jsx";
//require('./promizeCanvas.jsx');

class Promizehome extends React.Component {
    constructor(props) {
        super(props);
        // this.thumbImages = React.createRef();
        // this.cloud = React.createRef();
        // this.tabs = React.createRef();
        this.promizeInfo = {};
        this.state = {
            promizeBaseImgURL: 'https://bigcommerce.productimize.com/storage/productimize/',
            promizeCloudURL: 'https://live.productimize.com/promizenode/',
            promizeCloudParams: {
                "domainurl": "productimize-demo-store.mybigcommerce.com",
                "license": "cfc66ae7606245645dcaa62bdb2677a2c13e1b55",
                "id": 115
            },
            promizeInfo: '',
            promizeCanvas: '',
            currentView: 1,
            includeawardtitle: 0,
            textColor: '#000000'
        };
        this.changeCanvas = this.changeCanvas.bind(this);
        this.promizeZoomingAction = this.promizeZoomingAction.bind(this);
        this.promizeUpload = this.promizeUpload.bind(this);
        this.changeDefaultSetting = this.changeDefaultSetting.bind(this);
        this.applyoptionRules = this.applyoptionRules.bind(this);
        this.getCanvasColorObject = this.getCanvasColorObject.bind(this);
        this.promizeColorOption = this.promizeColorOption.bind(this);
        this.getCanvasOptionObject = this.getCanvasOptionObject.bind(this);
        this.promizeImageOption = this.promizeImageOption.bind(this);
        this.layering = this.layering.bind(this);
        this.addInCanvasImage = this.addInCanvasImage.bind(this);
        this.parsingOptionPosition = this.parsingOptionPosition.bind(this);
        this.optionFilters = this.optionFilters.bind(this);
        this.showGrid = this.showGrid.bind(this);
        this.showPrintArea = this.showPrintArea.bind(this);
        this.showRuler = this.showRuler.bind(this);
        this.textTop = this.textTop.bind(this);
        this.addInCanvasTabImage = this.addInCanvasTabImage.bind(this);
        this.textOverlay = this.textOverlay.bind(this);
    }

    componentWillMount() {
        console.time('Api')
        $.ajax({
            method: "POST",
            url: this.state.promizeCloudURL + 'customproductdetailtest',
            data: this.state.promizeCloudParams,
        }).then((data) => {
            console.timeEnd('Api')
            this.setState({ 'promizeInfo': data });
            this.setBaseImage(1);
        })
    }

    componentDidMount() {
        var promizeCanvas = this.state.promizeCanvas;
        promizeCanvas = new fabric.Canvas('promize-preview-image', { preserveObjectStacking: true, enableRetinaScaling: false, allowTouchScrolling: true });
        this.setState({ promizeCanvas: promizeCanvas }, () => {
            this.canvasInit(promizeCanvas);
        });
    }

    setBaseImage(viewside) {
        var promizeCanvas = this.state.promizeCanvas;
        if (this.state.promizeCanvas && this.state.promizeInfo) {
            const setBaseImage = this.state.promizeInfo.pc.values[0];
            var img = JSON.parse(setBaseImage.model_image);
            var side = "side_" + viewside;
            var downloadingImage = this.state.promizeBaseImgURL + 'baseimage/' + side + 'image/' + img[side];
            fabric.Image.fromURL(downloadingImage, function (img) {
                var oImg = img.set({
                    "src": downloadingImage,
                    "name": "baseimage",
                    "selectable": false,
                    "hasControls": false,
                    "hasBorders": false,
                    'crossOrigin': 'anonymous',
                    "layerno": -1,
                    "canvasId": 111111
                });
                var width = img.width;
                var height = img.height;
                // var clipPath = new fabric.Rect({
                //     width: 233,
                //     height: 300
                // });
                // oImg.clipPath = clipPath;
                promizeCanvas.setWidth(width);
                promizeCanvas.setHeight(height);
                promizeCanvas.add(oImg);



                // var clipPath = new fabric.Rect({
                //     width: 200,
                //     height: 350, top: 100, left: 150
                // });
                // var rect = new fabric.Rect({
                //     left: 67,
                //     top: 66,
                //     width: 100,
                //     height: 200,
                //     stroke: '#333',
                //     strokeWidth: 0.8,
                //     strokeDashArray: [10, 5],
                //     fill: 'transparent',
                //     layerno: 20,
                //     selectable: false
                // });
                // //rect.clipPath = clipPath;
                // promizeCanvas.add(rect);


            }, { 'crossOrigin': 'anonymous' });
        }
    }

    changeCanvas(objectType, objectDetail, tabDetail) {
        var promizeCanvas = this.state.promizeCanvas;
        let layering = this.layering;
        if (objectType == 'text') {
            var textJsonObj = this.getCanvasTextObject(objectDetail, tabDetail, 1)
            console.log(objectDetail.text_tab_id)
            var obj = promizeCanvas.getItemByName('canvasView_' + objectDetail.text_tab_id);
            var incanvas = obj ? true : false;
            if (incanvas) {
                obj.set(textJsonObj);
                this.textOverlay(obj)
                layering(promizeCanvas);
            } else {
                var obj = new fabric.Textbox(objectDetail['text'], textJsonObj);

                promizeCanvas.add(obj);
                layering(promizeCanvas);
                promizeCanvas.renderAll();
                this.textOverlay(obj)
            }
        }
    }


    canvasInit() {
        var promizeCanvas = this.state.promizeCanvas;
        //var deleteClipartFromCanvas = this.removeObjectFromCanvas;
        let removeOptionFromDefaultOptions = this.props.removeOptionFromDefaultOptions;
        var canvasObjectCallback = this.props.canvasObjectCallback;
        // canvasside.on('object:scaling', e => canvasObjectCallback(e.target, "scaling"))
        //     .on('object:moving', e => canvasObjectCallback(e.target, "moving"))
        //     .on('object:added', e => canvasObjectCallback(e.target, "added"))

        var textLimit = this.textLimit;
        var textOverlay = this.textOverlay
        promizeCanvas.on('object:moving', function (data) {
            textOverlay(data.target)
        }).on('object:scaling', function (data) {
            textOverlay(data.target)
        }).on('object:modified', function (data) {
            var obj = data.target;
            var objTop = obj.top;
            var objLeft = obj.left;
            var topBound = obj.boundaray.top;
            var bottomBound = topBound + obj.boundaray.height;
            var leftBound = obj.boundaray.left;
            var rightBound = leftBound + obj.boundaray.width;
            obj.set('left', (Math.min(Math.max(objLeft, leftBound), rightBound - obj.width)));
            obj.set('top', (Math.min(Math.max(objTop, topBound), bottomBound - obj.height)));

            //obj.width = width;
            obj.setCoords();

            var textObject = {
                fontSize: obj.fontSize || 20,
                fontFamily: obj.fontFamily,
                textAlign: obj.textAlign,
                text: obj.text,
                angle: obj.angle,
                breakWords: false,
                fontWeight: obj.fontWeight,
                fontStyle: obj.fontStyle,
                textDecoration: obj.textDecoration,
                underline: obj.underline,
                scaleX: obj.scaleX,
                scaleY: obj.scaleY,
            };

            var width = textLimit(obj.text, textObject, obj.boundaray.width);
            obj.set('width', width);
            obj.set('text', obj.text);
            obj.setCoords();
            console.log(width);

        });

        function controlPoints(promizeCanvas) {
            var HideControls = {
                'tl': true,
                'tr': false,
                'bl': false,
                'br': true,
                'ml': false,
                'mt': false,
                'mr': false,
                'mb': false,
                'mtr': false
            };
            var cornerSize = 50;
            if (screen.width <= 768) {
                cornerSize = 70;
            }
            fabric.Object.prototype.set({
                //transparentCorners: true,
                borderColor: '#1e6780',
                cornerColor: '#1e6780',
                padding: 5,
                hasRotatingPoint: false,
                cornerSize: cornerSize
            });

            isVML = function isVML() {
                return typeof G_vmlCanvasManager !== 'undefined';
            };

            //********override*****//
            // fabric.Object.prototype._drawControl = function (control, ctx, methodName, left, top) {
            //     var self = this;
            //     if (!this.isControlVisible(control) && promizeCanvas.getActiveObject()) {
            //         return;
            //     }

            //     //var SelectedIconImage = new Image();
            //     var size = this.cornerSize;

            //     // SelectedIconImage.onload = function () {
            //     //     canvasside.requestRenderAll();
            //     // }
            //     /*  fabric.isVML() ||*/
            //     isVML() || this.transparentCorners || ctx.clearRect(left, top, size, size);
            //     //this.transparentCorners || ctx.clearRect(left, top, size, size);
            //     switch (control) {
            //         case 'tl':
            //             /*delete*/
            //             SelectedIconImage = document.getElementById("canvas-icon-close");
            //             break;
            //         case 'br':
            //             /*rotate*/
            //             SelectedIconImage = document.getElementById("canvas-icon-extend");
            //             break;
            //     }

            //     if (control == 'tl' || control == 'br') {
            //         try {
            //             ctx.drawImage(SelectedIconImage, left, top, size, size);
            //         } catch (e) {
            //             ctx[methodName](left, top, size, size);
            //         }
            //     }
            // };

            // // override prorotype _setCornerCursor to change the corner cusrors
            // fabric.Canvas.prototype.getCornerCursor = function (t, e, i) {
            //     if (t == "tl") {
            //         return "pointer";
            //     } else if (t == "br") {
            //         return "se-resize";
            //     } else {
            //         return this.defaultCursor;
            //     }
            // }, fabric.Canvas.prototype._performTransformAction = function (e, transform, pointer) {
            //     var y = pointer.y,
            //         x = pointer.x,
            //         action = transform.action,
            //         actionPerformed = false,
            //         options = {
            //             target: transform.target,
            //             e: e,
            //             transform: transform,
            //             pointer: pointer
            //         };

            //     if (action === 'rotate') {
            //         (actionPerformed = this._rotateObject(x, y)) && this._fire('rotating', options);
            //     } else if (action === 'scale') {
            //         (actionPerformed = this._onScale(e, transform, x, y)) && this._fire('scaling', options);
            //     } else if (action === 'scaleX') {
            //         (actionPerformed = this._scaleObject(x, y, 'x')) && this._fire('scaling', options);
            //     } else if (action === 'scaleY') {
            //         (actionPerformed = this._scaleObject(x, y, 'y')) && this._fire('scaling', options);
            //     }
            //     /**ADD**/
            //     else if (action === 'delete') {
            //         //do nothing, because here function executed when mouse moves
            //         this.setCursor(options.target.pointerCursor || this.pointerCursor);
            //     }
            //     /**ADD END**/
            //     else {
            //         actionPerformed = this._translateObject(x, y);
            //         if (actionPerformed) {
            //             this._fire('moving', options);
            //             this.setCursor(options.target.moveCursor || this.moveCursor);
            //         }
            //     }
            //     transform.actionPerformed = transform.actionPerformed || actionPerformed;
            // };
        }



        // cursor pointer
        // fabric.Canvas.prototype.getCornerCursor = function (t, e, i) {
        //     if (t == "tl") {
        //         return "pointer";
        //     } else {
        //         return this.defaultCursor;
        //     }
        // },
        fabric.Canvas.prototype.getItemByName = function (name) { //prototype canvas
            var object = null, objects = this.getObjects();
            for (var i = 0, len = this.size(); i < len; i++) {

                console.log(objects[i].name)
                if (objects[i].name && objects[i].name === name) {
                    object = objects[i];
                    break;
                }
            }
            return object;
        };
        fabric.Canvas.prototype.getItemById = function (canvasId) { //prototype canvas
            var object = null, objects = this.getObjects();
            for (var i = 0, len = this.size(); i < len; i++) {
                if (objects[i].canvasId && objects[i].canvasId === canvasId) {
                    object = objects[i];
                    break;
                }
            }
            return object;
        };
    }


    parsingBoundarayPosition(textBoundary) {
        let textBoundaryValues = textBoundary.split(',');
        if (!textBoundaryValues[0]) {
            textBoundaryValues[0] = 0
        }
        if (!textBoundaryValues[1]) {
            textBoundaryValues[1] = 0
        }
        if (!textBoundaryValues[2]) {
            textBoundaryValues[2] = 100
        }
        if (!textBoundaryValues[3]) {
            textBoundaryValues[3] = 100
        }
        return textBoundaryValues
    }


    textOverlay(obj) {
        console.log("objobj",obj)
        obj.setCoords();
        console.log(obj)
        if (obj.promizeClip) {
            obj.clipTo = function (ctx) {
                var scaleXTo1 = 1 / this.scaleX; // Todo: this
                var scaleYTo1 = 1 / this.scaleY; // Todo: this
                console.log('1')
                ctx.save();
                var clipObj = [];
                clipObj = {
                    originX: 'left',
                    originY: 'top',
                    left: obj.boundaray.left,
                    top: obj.boundaray.top,
                    width: obj.boundaray.width,
                    height: obj.boundaray.height,
                    fill: '#000', /* use transparent for no fill */
                    strokeWidth: 0,
                    selectable: false
                };
                console.log(2)
                var ctxLeft = -(obj.width / 2); // Todo: this
                var ctxTop = -(obj.height / 2); // Todo: this
                var ctxWidth = clipObj.width;
                var ctxHeight = clipObj.height;

                ctx.translate(ctxLeft, ctxTop);
                ctx.scale(scaleXTo1, scaleYTo1);
                console.log(3)
                ctx.beginPath();

                ctx.rect(clipObj.left - this.aCoords.tl.x, clipObj.top - this.aCoords.tl.y, clipObj.width, clipObj.height);
                ctx.closePath();
                ctx.restore();
            };
        }
        return obj.clipTo;
    }


    getCanvasTextObject(textSetting, tabData, currentView) {
        var textDetail = textSetting['textDetail'];
        //var fontColor = textSetting['fill'] || '#000';
        var fontColor = this.state.textColor;
        let textBoundaryValues = this.parsingBoundarayPosition(textDetail.boundary_position)
        // var clipPath = {
        //     "left": textBoundaryValues ? parseFloat(textBoundaryValues[0]) : 0,
        //     "top": textBoundaryValues ? parseFloat(textBoundaryValues[1]) : 0,
        //     "width": textBoundaryValues ? parseFloat(textBoundaryValues[2]) : 0,
        //     "height": textBoundaryValues ? parseFloat(textBoundaryValues[3]) : 0
        // };

        var textObject = {
            ...this.state.movable,
            ...this.state.controlPoints,
            name: "canvasView_" + textSetting['text_tab_id'],
            left: parseFloat(textBoundaryValues[0]),
            top: parseFloat(textBoundaryValues[1]),
            fontSize: parseInt(textSetting['fontSize']) || 20,
            fontFamily: textSetting['fontFamily'],
            textAlign: textSetting['textAlign'],
            fill: fontColor,
            text: textSetting['text'],
            layerno: tabData.tab_layer_no,
            angle: textDetail.text_display,
            boundaray: {
                left: parseFloat(textBoundaryValues[0]),
                top: parseFloat(textBoundaryValues[1]),
                width: parseFloat(textBoundaryValues[2]),
                height: parseFloat(textBoundaryValues[3])
            },
            //charSpacing: textSetting['charSpacing'],
            viewSide: currentView,
            prevData: '',
            breakWords: false,
            fontWeight: textSetting['fontWeight'],
            fontStyle: textSetting['fontStyle'],
            textDecoration: 'none',
            underline: textSetting['underline'],
            bringToFront: true,
            editable: false,
            promizeClip: true,
            selectable: true,
            hasControls: textSetting['coordinates'],
            objType: 'text'
        };




        var width = this.textLimit(textSetting['text'], textObject, textBoundaryValues[2]);
        textObject.width = width;
        var textTop = this.textTop(textSetting['text'], textObject, textDetail.boundary_position);
        textObject.top = parseInt(textTop);
        return textObject;
    }

    textLimit(textValue, textObject, boundarywidth) {
        var textValue = textValue.replace(/ /g, 0);
        console.log(textValue, textObject);

        var textObject = {
            fontSize: textObject.fontSize || 20,
            fontFamily: textObject.fontFamily,
            textAlign: textObject.textAlign,
            text: textObject.text,
            angle: textObject.angle,
            breakWords: false,
            fontWeight: textObject.fontWeight,
            fontStyle: textObject.fontStyle,
            textDecoration: textObject.textDecoration,
            underline: textObject.underline,
            scaleX: textObject.scaleX,
            scaleY: textObject.scaleY,
        };



        var textWidth = new fabric.Textbox(textValue, textObject).width;
        console.log(textWidth);
        var objecttextWidth = textWidth + 50;
        console.log(objecttextWidth, parseInt(boundarywidth));
        if (parseInt(boundarywidth) + 30 <= textWidth) {
            objecttextWidth = boundarywidth;
        }
        console.log(objecttextWidth)
        return objecttextWidth;
    }

    textTop(textValue, textObject, boundaryValue) {
        let textBoundaryValues = this.parsingBoundarayPosition(boundaryValue)
        var textValue = textValue.replace(/ /g, 0);
        var textHeight = new fabric.Textbox(textValue, textObject).height;
        var textTop = textBoundaryValues[1];
        if ((parseInt(textHeight) + parseInt(textBoundaryValues[1])) > (parseInt(textBoundaryValues[1]) + parseInt(textBoundaryValues[3]))) {
            textTop = parseInt(textBoundaryValues[1]) + parseInt(textBoundaryValues[3]) - parseInt(textHeight)
        }
        return textTop;
    }


    promizeUpload(imgPath) {
        var promizeCanvas = this.state.promizeCanvas;
        imgPath.onload = function () {
            let scale = 300 / imgPath.width;


            var imgInstance = new fabric.Image(imgPath, {

                left: 50,
                top: 50,
                // angle: 0,
                // opacity: 0.75,
                // width: 300,
                // height: 300
            });
            imgInstance.scaleToWidth(120, false);
            promizeCanvas.add(imgInstance);
        }
    }


    changeDefaultSetting(currentOption, tabData) {
        var promizeCanvas = this.state.promizeCanvas;
        let imageContent = this.state.imageContent;
        var optionName = "canvasView_" + tabData.tab_id;
        if ((currentOption.modelimage_replace && currentOption.modelimage_replace == 1) || (tabData.tab_code && tabData.tab_code.includes('colorpicker'))) {
            optionName = 'baseimage';
        }
        if ((tabData.tab_code && tabData.tab_code.includes('textcolor'))) {
            this.setState({ textColor: currentOption.option_color });
        } else {
            var canvas = promizeCanvas.getItemByName(optionName);
            var incanvas = canvas ? true : false;
            console.log(optionName, ',', incanvas)
            let object = '';
            this.applyoptionRules(currentOption, tabData);
            if (currentOption.option_color) {
                object = this.getCanvasColorObject(currentOption, tabData, this.state.currentView)
                this.promizeColorOption(currentOption, tabData, incanvas, this.state.promizeCanvas, object, this.state.currentView);
            } else {
                object = this.getCanvasOptionObject(currentOption, tabData, this.state.currentView)
                this.promizeImageOption(currentOption, tabData, incanvas, this.state.promizeCanvas, object, this.state.currentView);
            }
        }
    }

    applyoptionRules(currentOption, tabData) {
        if (currentOption.option_code && currentOption.option_code.includes('showawardtitle')) {
            this.setState({ 'includeawardtitle': 1 });
        } else if (currentOption.option_code && currentOption.option_code.includes('removeawardtitle')) {
            this.setState({ 'includeawardtitle': 0 });
        }
        if (tabData.tab_code && tabData.tab_code.includes('print_color')) {
            if (currentOption.option_color) {
                this.setState({ 'textColor': currentOption.option_color })
            }
        }
    }

    getCanvasColorObject(option, tabData, currentView) {
        var random_number = Math.floor(Math.random() * 1000000);
        var optPosition = this.parsingOptionPosition(tabData.tab_position, currentView);
        return {
            "name": "canvasView_" + tabData.tab_id,
            "angle": 0, "selectable": false,
            "hasControls": false,
            "hasBorders": false,
            "selectable": false,
            "evented": false,
            "left": parseFloat(optPosition[0]),
            "top": parseFloat(optPosition[1]),
            "customOption": 1,
            "layerno": tabData.tab_layer_no,
            "viewSide": currentView,
            "objType": 'color',
            "crossOrigin": 'anonymous',
            "canvasId": random_number
        }
    }

    promizeColorOption(option, tab, inCanvas, canvasside, object, currentView) {
        var promizeCanvas = this.state.promizeCanvas;
        var json_tabImage = JSON.parse(tab.tab_image);
        let layering = this.layering;
        var tabImg = '';
        var optionName = "canvasView_" + option.tab_id;
        if ((option.modelimage_replace && option.modelimage_replace == 1) || (tab.tab_code && tab.tab_code.includes('colorpicker'))) {
            optionName = 'baseimage';
        }
        if (json_tabImage && json_tabImage['side_' + currentView]) {
            tabImg = this.state.promizeBaseImgURL + '/tabimage/side_' + currentView + 'image/' + json_tabImage['side_' + currentView];
            if (tab.tab_code && tab.tab_code.includes('colorpicker')) {
                if (object.src) {
                    tabImg = object.src;
                }
            }
            if (inCanvas) {
                var obj = promizeCanvas.getItemByName(optionName);
                var color = option.option_color.replace('"', '');
                var filter = [];
                filter.push(new fabric.Image.filters.BlendColor({
                    // fill: color,
                    mode: "multiply",
                    color: color
                }));
                obj.filters = filter;

                obj.applyFilters();
                console.log(obj)
                promizeCanvas.renderAll();
                layering(promizeCanvas);
            } else {
                alert('3')
                this.addInCanvasTabImage(option, promizeCanvas, object, currentView, tabImg, null);
            }
        } else if (inCanvas) {
            var obj = promizeCanvas.getItemByName(optionName);
            obj.filters[0].color = option.option_color.replace('"', '');
            obj.applyFilters();
            promizeCanvas.renderAll();
            layering(promizeCanvas);
        }
    }

    addInCanvasTabImage(option, canvasside, object, currentView, tabImg, patternImage) {
        var img = new Image();
        var color = option.option_color.replace('"', '');
        let layering = this.layering;
        img.src = tabImg;
        img.onload = function () {
            object["src"] = tabImg;
            fabric["Image"].fromObject(
                object,
                function (oImg) {
                    oImg.set(object);
                    oImg.opacity = 1;
                    canvasside.add(oImg);
                    if (patternImage) {
                        object['src'] = patternImage;
                        fabric["Image"].fromObject(object, function (patternImage) {
                            patternImage.set(object);
                            var imgFilter = new fabric.Image.filters.BlendImage({
                                image: patternImage,
                                //mode: "multiply",
                            });
                            oImg.filters.push(imgFilter);
                            oImg.applyFilters();
                            canvasside.renderAll();
                            layering(canvasside);
                        }, { crossOrigin: 'Anonymous' });
                    } else {
                        var filter = new fabric.Image.filters.BlendColor({
                            // fill: color,
                            mode: "multiply",
                            color: color
                        });
                        console.log(filter)
                        oImg.filters.push(filter);
                        oImg.applyFilters();
                        canvasside.renderAll();
                        layering(canvasside);
                    }
                },
                { crossOrigin: "Anonymous" }
            );
        };
    }

    getCanvasOptionObject(option, tabData, currentView) {
        var random_number = Math.floor(Math.random() * 1000000);
        var optPosition = this.parsingOptionPosition(option.option_position, currentView);
        return {
            "name": "canvasView_" + tabData.tab_id,
            "angle": 0, "selectable": false,
            "hasControls": false,
            "hasBorders": false,
            "selectable": false,
            "evented": false,
            "left": parseFloat(optPosition[0]),
            "top": parseFloat(optPosition[1]),
            "customOption": 1,
            "layerno": tabData.tab_layer_no,
            "viewSide": currentView,
            "objType": 'option',
            "crossOrigin": 'anonymous',
            "canvasId": random_number
        }
    }

    promizeImageOption(option, tab, inCanvas, canvasside, object, currentView) {
        var promizeCanvas = this.state.promizeCanvas;
        var imgFilters = this.optionFilters(tab.image_color_settings, '', 2);
        var json_optionImage = JSON.parse(option.option_image);
        var optionName = "canvasView_" + option.tab_id;
        if ((option.modelimage_replace && option.modelimage_replace == 1) || (tab.tab_code && tab.tab_code.includes('colorpicker'))) {
            optionName = 'baseimage';
            object.name = 'baseimage';
        }
        var optionImg = '';
        let layering = this.layering;
        if (json_optionImage && json_optionImage['side_' + currentView]) {
            optionImg = this.state.promizeBaseImgURL + '/optionimage/side_' + currentView + 'image/' + json_optionImage['side_' + currentView];
            if (inCanvas) {
                console.log('innner')
                var obj = promizeCanvas.getItemByName(optionName);
                obj.set(object);
                obj.setSrc(optionImg, function () {
                    obj.opacity = 1;
                    promizeCanvas.renderAll();
                    layering(promizeCanvas);
                }, { crossOrigin: 'Anonymous' });
            } else {
                console.log('outside')
                this.addInCanvasImage(option, promizeCanvas, object, currentView, optionImg);
            }
        } else if (inCanvas) {
            console.log('outside else')
            var obj = promizeCanvas.getItemByName(optionName);
            obj.set(object);
            obj.setSrc(optionImg, function () {
                obj.opacity = 1;
                promizeCanvas.renderAll();
                layering(promizeCanvas);
            }, { crossOrigin: 'Anonymous' });
        }
    }

    layering(canvasside) {
        var promizeCanvas = this.state.promizeCanvas;
        promizeCanvas._objects.sort(function (a, b) {
            return (parseInt(a.layerno) || 0) - (parseInt(b.layerno) || 0)
        })
        promizeCanvas.renderOnAddRemove && promizeCanvas.requestRenderAll();

    }

    optionFilters(imageColorSettings, optionColor, customOption) {
        var imageFilters = [];
        var mat1 = 0, mat2 = 0, mat3 = 0;
        if (customOption == 1 || customOption == 3) {
            if (imageColorSettings) {
                matrixFormat = imageColorSettings.split(',');
                mat1 = matrixFormat[0];
                mat2 = matrixFormat[1];
                mat3 = matrixFormat[2];
            }
            if ((mat1 > 0) || (mat2 > 0) || (mat3 > 0)) {
                var matrixColor = new fabric.Image.filters.ColorMatrix({
                    matrix: [1, mat1, mat2, mat3, 0, 1, mat1, mat2, mat3, 0, 1, mat1, mat2, mat3, 0, 0, 0, 0, 1, 0]
                });
                imageFilters.push(matrixColor);
            }
            if (optionColor) {
                var blendFilter = new fabric.Image.filters.BlendColor({
                    color: optionColor, mode: 'multiply', alpha: 1
                });
                imageFilters.push(blendFilter);
            }
        }
        return imageFilters;
    }

    addInCanvasImage(option, canvasside, object, currentView, optionImg) {
        var img = new Image();
        var promizeCanvas = this.state.promizeCanvas;
        img.src = optionImg;
        var oImg = {};
        let layering = this.layering;
        console.log('testest')
        img.onload = function () {
            console.log('sdfdsfsf')
            object['src'] = optionImg;
            fabric["Image"].fromObject(object, function (oImg) {
                oImg.set(object);
                if (option.modelimage_replace) {
                    promizeCanvas.setWidth(oImg.width);
                    promizeCanvas.setHeight(oImg.height);
                }
                promizeCanvas.add(oImg);
                if (object.filterColor) {
                    let filters = []
                    var grayFilter = new fabric.Image.filters.Grayscale({
                        "customtype": "gray"
                    });
                    var blendFilter = new fabric.Image.filters.BlendColor({
                        "customtype": "blend",
                        "color": object.filterColor,
                        "mode": "add"
                    });
                    filters.push(grayFilter);
                    filters.push(blendFilter);
                    oImg.set("filters", filters);
                    oImg.applyFilters();
                }
                console.log(oImg)
                promizeCanvas.renderAll();
                layering(canvasside);
            }, { crossOrigin: 'Anonymous' });

        };
    }

    parsingOptionPosition(opPosition, viewPosition) {
        var optionLeft = 0, optionTop = 0;
        var positionArray = [];
        positionArray[0] = optionLeft;
        positionArray[1] = optionTop;
        if (opPosition) {
            var json_optionPosition = JSON.parse(opPosition);
            if (json_optionPosition['side_' + viewPosition]) {
                var splittabPostion = json_optionPosition['side_' + viewPosition].split(',');
                positionArray[0] = splittabPostion[0];
                positionArray[1] = splittabPostion[1];
            }
        }
        return positionArray;
    }

    promizeZoomingAction(zoom) {
        var promizeCanvas = this.state.promizeCanvas;
        var zoomVal = 0.10;
        var Canvaszoom = promizeCanvas.getZoom();
        if (zoom == 'zoomin') {
            if (Canvaszoom < 1.3) {
                Canvaszoom = Canvaszoom + zoomVal;
            }
        } else {
            if (Canvaszoom > 0.7) {
                Canvaszoom = Canvaszoom - zoomVal;
            }
        }
        // if (Canvaszoom > 20) Canvaszoom = 20;
        // if (Canvaszoom < 0.01) Canvaszoom = 0.01;
        promizeCanvas.zoomToPoint(new fabric.Point(promizeCanvas.width / 2, promizeCanvas.height / 2), Canvaszoom);
        promizeCanvas.renderAll();

    }



    showGrid() {
        let canvas = this.state.promizeCanvas;
        let baseImgObj = canvas.getItemByName('baseimage');

        let gridObj = canvas.getItemByName('grid');
        if (gridObj) {
            canvas.remove(gridObj);
        } else {
            fabric.Image.fromURL('grid.png', function (myImg) {
                canvas.add(myImg);
                myImg.set({
                    name: 'grid',
                    height: baseImgObj.height + 300,
                    width: baseImgObj.width + 160,
                    scaleX: 0.3,
                    scaleY: 0.3,
                    originX: 'center',
                    originY: 'center',
                    selectable: false,
                    crossOrigin: "anonymous",
                });

                canvas.centerObject(myImg);
                myImg.setCoords();
            });
        }

        canvas.renderAll();
    }

    showPrintArea() {
        let canvas = this.state.promizeCanvas;
        let baseImgObj = canvas.getItemByName('baseimage');

        let print_areaObj = canvas.getItemByName('print_area');
        if (print_areaObj) {
            canvas.remove(print_areaObj);
        } else {
            var rect = new fabric.Rect({
                name: 'print_area',
                height: baseImgObj.height - 150,
                width: baseImgObj.width - 110,
                strokeWidth: 2,
                stroke: '#00FFFF',
                fill: 'transparent',
                selectable: false,
            });

            canvas.add(rect);
            canvas.centerObject(rect);
            canvas.renderAll();
        }
    }


    showRuler() {
        let canvas = this.state.promizeCanvas;
        let scaleWidth = canvas.height * 2.5;
        var obj = canvas.getItemByName('baseimage');
        let rullerdObj = canvas.getItemByName('ruller');
        if (rullerdObj) {
            canvas.remove(rullerdObj);
        } else {
            fabric.Image.fromURL('scalle.png', function (myImg) {
                var img = myImg.set({
                    name: 'ruller',
                    height: 400,
                    width: scaleWidth,
                    top: obj.top + 50,
                    hasRotatingPoint: false,
                    scaleX: 0.3,
                    scaleY: 0.15,
                    angle: 90,
                    crossOrigin: "anonymous",
                });
                img.setCoords();


                img.setControlsVisibility({
                    bl: false,
                    br: false,
                    mb: false,
                    ml: true,
                    mr: true,
                    mt: false,
                    mtr: false,
                    tl: false,
                    tr: false
                });

                var rullerObj = canvas.getItemByName('ruller');
                if (rullerObj) {
                    canvas.renderAll();
                } else {
                    canvas.add(img);
                    img.centerH();
                }
            });
        }
    }





    render() {
        var promizeDetail = {};
        var promizeTabs = '';
        if (this.state.promizeInfo.pps) {
            promizeDetail['section'] = this.state.promizeInfo.pps.values;
            promizeDetail['defaultSection'] = this.state.promizeInfo.pps.values[0].product_section_id;
        }
        if (this.state.promizeInfo.ppt) {
            promizeDetail['tab'] = this.state.promizeInfo.ppt.values;
            promizeDetail['option'] = this.state.promizeInfo.ppo.values;
            promizeDetail['text'] = this.state.promizeInfo.pts.values;
            promizeDetail['uploadimage'] = this.state.promizeInfo.pcs.values;
            promizeDetail['promizeBaseImgURL'] = this.state.promizeBaseImgURL;
            promizeDetail['promizeCanvas'] = this.state.promizeCanvas;
        }
        return (
            <div className="Promize-container">
                <div className="promize-customize-cover">
                    <PromizeCanvas promizeInfo={this.state.promizeInfo} promizeDetail={promizeDetail} promizeZoomingAction={this.promizeZoomingAction} showGrid={this.showGrid} showPrintArea={this.showPrintArea} showRuler={this.showRuler}></PromizeCanvas>
                    {Object.keys(this.state.promizeInfo).length > 0 && <Promizecustomizer promizeDetail={promizeDetail} changeCanvas={this.changeCanvas} promizeUploadImage={this.promizeUploadImage} promizeUpload={this.promizeUpload} changeDefaultSetting={this.changeDefaultSetting} {...this.state}></Promizecustomizer>}

                </div>
            </div>
        );
    }
}

ReactDOM.render(<Promizehome />, document.getElementById('root'));