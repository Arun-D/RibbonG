class Cloud extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movable: {
        selectable: true,
        hasControls: true,
        hasBorders: true,
      },
      controlPoints: {
        cornerSize: 12,
        hasControls: true,
        borderColor: '#0032cc',
        cornerColor: '#06f',
        cornerStyle: "circle",
        transparentCorners: false,
        hasControls: true,
        padding: "3",
        selectable: true,
        hasRotatingPoint: true
      }
    }
    this.promizeCanvasImage = this.promizeCanvasImage.bind(this);
    this.parsingOptionPosition = this.parsingOptionPosition.bind(this);
    this.promizeImageOption = this.promizeImageOption.bind(this);
    this.applyCavasObject = this.applyCavasObject.bind(this);
    this.addInCanvasImage = this.addInCanvasImage.bind(this);
    this.optionFilters = this.optionFilters.bind(this);
    this.promizeUploadImageOption = this.promizeUploadImageOption.bind(this);
    this.promizeClipartOption = this.promizeClipartOption.bind(this);
    this.promizePatternOption = this.promizePatternOption.bind(this);
    this.layering = this.layering.bind(this);
    this.removeObjectFromCanvas = this.removeObjectFromCanvas.bind(this);
  }
  layering(canvasside) {
    alert('ddsfsf')
    var canvasside = canvasside;
    canvasside._objects.sort(function (a, b) {
      return (parseInt(a.layerno) || 0) - (parseInt(b.layerno) || 0)
    })
    canvasside.renderOnAddRemove && canvasside.requestRenderAll();

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
  promizeImageOption(option, tab, inCanvas, canvasside, object, currentView) {
    var canvasside = canvasside;
    var imgFilters = this.optionFilters(tab.image_color_settings, '', 2);
    var json_optionImage = JSON.parse(option.option_image);
    var optionImg = '';
    let layering = this.layering;
    if (json_optionImage && json_optionImage['side_' + currentView]) {
      optionImg = this.props.promizeBaseImgURL + '/optionimage/side_' + currentView + 'image/' + json_optionImage['side_' + currentView];
      if (inCanvas) {
        var obj = canvasside.getItemByName("canvasView_" + option.tab_id);
        obj.set(object);
        obj.setSrc(optionImg, function () {
          obj.opacity = 1;
          canvasside.renderAll();
          layering(canvasside);
        }, { crossOrigin: 'Anonymous' });
      } else {
        this.addInCanvasImage(option, canvasside, object, currentView, optionImg);
      }
    } else if (inCanvas) {
      var obj = canvasside.getItemByName("canvasView_" + option.tab_id);
      obj.set(object);
      obj.setSrc(optionImg, function () {
        obj.opacity = 1;
        canvasside.renderAll();
        layering(canvasside);
      }, { crossOrigin: 'Anonymous' });
    }
  }
  promizeClipartOption(option, tab, inCanvas, canvasside, object, currentView) {
    var canvasside = canvasside;
    var json_optionImage = option.promize_product_clipart_image;
    var optionImg = this.props.promizeBaseImgURL + 'clipart/' + option.promize_product_clipart_image;
    let layering = this.layering;
    if (optionImg) {
      if (inCanvas) {
        var obj = canvasside.getItemById(object.canvasId);
        obj.set(object);
        obj.setSrc(optionImg, function () {
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
            obj.set("filters", filters);
            obj.applyFilters();
          }
          obj.opacity = 1;
          canvasside.renderAll();
          layering(canvasside);
        }, { crossOrigin: 'Anonymous' });
      } else {
        this.addInCanvasImage(option, canvasside, object, currentView, optionImg);
      }
    } else if (inCanvas) {
      var obj = canvasside.getItemById(object.canvasId);
      obj.set(object);
      obj.setSrc(optionImg, function () {
        obj.opacity = 1;
        canvasside.renderAll();
        layering(canvasside);
      }, { crossOrigin: 'Anonymous' });
    }
  }
  promizeUploadImageOption(option, tab, optionImg, canvasside, object, currentView, incanvas) {
    const layering = this.layering;
    if (incanvas) {
      var obj = canvasside.getItemById(object.canvasId);
      obj.set(object);
      obj.setSrc(optionImg, function () {
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
          obj.set("filters", filters);
          obj.applyFilters();
        }
        obj.opacity = 1;
        canvasside.renderAll();
        layering(canvasside);
      }, { crossOrigin: 'Anonymous' });
    } else {
      this.addInCanvasImage(option, canvasside, object, currentView, optionImg);
    }
  }
  promizePatternOption(option, tab, inCanvas, canvasside, object, currentView) {
    var canvasside = canvasside;
    var json_optionImage = option.option_thumbnail_image;
    var optionImg = '';
    let layering = this.layering;
    if (json_optionImage) {
      optionImg = this.props.promizeBaseImgURL + '/thumbnailimage/' + option.option_thumbnail_image;
      if (inCanvas) {
        var obj = canvasside.getItemByName("canvasView_" + option.tab_id);
        obj.set(object);
        obj.setSrc(optionImg, function () {
          obj.opacity = 1;
          canvasside.renderAll();
          layering(canvasside);
        }, { crossOrigin: 'Anonymous' });
      } else {
        this.addInCanvasImage(option, canvasside, object, currentView, optionImg);
      }
    } else if (inCanvas) {
      var obj = canvasside.getItemByName("canvasView_" + option.tab_id);
      obj.set(object);
      obj.setSrc(optionImg, function () {
        obj.opacity = 1;
        canvasside.renderAll();
        layering(canvasside);
      }, { crossOrigin: 'Anonymous' });
    }
  }
  promizeText(text, tab, inCanvas, canvasside) {
    let layering = this.layering;
    console.log(text)
    console.log(tab)
    if (inCanvas) {
      console.log(text.tab_id)
      var obj = canvasside.getItemByName("canvasView_" + text.tab_id);
      text.object.text = text.object.text || ''
      obj.set(text.object);
      canvasside.renderAll();
      layering(canvasside);
    } else {
      var obj = new fabric.Textbox(text.object.text || '');
      obj.set(text.object);
      canvasside.add(obj);
      canvasside.renderAll();
      layering(canvasside);
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

  promizeColorOption(option, tab, inCanvas, canvasside, object, currentView) {
    var canvasside = canvasside;
    var json_tabImage = JSON.parse(tab.tab_image);
    let layering = this.layering;
    var tabImg = '';
    if (json_tabImage && json_tabImage['side_' + currentView]) {
      tabImg = this.props.promizeBaseImgURL + '/tabimage/side_' + currentView + 'image/' + json_tabImage['side_' + currentView];
      if (inCanvas) {
        var obj = canvasside.getItemByName("canvasView_" + option.tab_id);
        obj.filters[0].color = option.option_color.replace('"', '');
        obj.applyFilters();
        canvasside.renderAll();
        layering(canvasside);
      } else {
        this.addInCanvasTabImage(option, canvasside, object, currentView, tabImg, null);
      }
    } else if (inCanvas) {
      var obj = canvasside.getItemByName("canvasView_" + option.tab_id);
      obj.filters[0].color = option.option_color.replace('"', '');
      obj.applyFilters();
      canvasside.renderAll();
      layering(canvasside);
    }
  }
  applyCavasObject(obj, imgFilters, addStatus, callback, canvasside) {
    obj.filters = imgFilters;
    let layering = this.layering;
    obj.crossOrigin = "anonymous";
    if (obj.filters) {
      obj.applyFilters();
    }
    obj.opacity = 1;
    if (addStatus == 1) {
      canvasside.add(obj);
      layering(canvasside);
      if (callback != '') {
        callback()
      }
    } else {
      canvasside.renderAll();
      layering(canvasside);
    }
  }

  addInCanvasImage(option, canvasside, object, currentView, optionImg) {
    var img = new Image();
    img.src = optionImg;
    var oImg = {};
    let layering = this.layering;
    img.onload = function () {
      object['src'] = optionImg;
      fabric["Image"].fromObject(object, function (oImg) {
        oImg.set(object);
        if (option.modelimage_replace) {
          canvasside.setWidth(oImg.width);
          canvasside.setHeight(oImg.height);
        }
        canvasside.add(oImg);
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
        canvasside.renderAll();
        layering(canvasside);
      }, { crossOrigin: 'Anonymous' });

    };
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
  getCanvasPatternObject(option, tabData, currentView) {
    var random_number = Math.floor(Math.random() * 1000000);
    var optPosition = this.parsingOptionPosition(tabData.tab_position, currentView);
    let imageBoundary = option.option_position;
    var imageBoundaryValues = imageBoundary && imageBoundary.split(',');
    let overlay = this.props.customizer.pdoi.values;
    let promizeClip = '';
    if (tabData.overlay_image_id && overlay.length > 0 && tabData.overlay_position) {
      let overlayImage = overlay.find((o) => { return o.overlay_image_id == tabData.overlay_image_id })
      /** overlay Image */
      let overlayImageObj = (overlayImage ? JSON.parse(overlayImage.overlay_image) : {})
      let promizeClipImg = (overlayImageObj['side_' + currentView] ? this.props.promizeBaseImgURL + 'overlayimage/' + 'side_' + currentView + '/' + overlayImageObj['side_' + currentView] : '')

      /** overlay position */
      let overlayPosition = (tabData.overlay_position ? JSON.parse(tabData.overlay_position) : {})
      let offSets = overlayPosition['side_' + currentView];
      let [left, top] = offSets.split(',')
      promizeClip = {
        src: promizeClipImg,
        left: left,
        top: top
      }
    }
    return {
      ...this.state.movable,
      ...this.state.controlPoints,
      "name": "canvasView_" + tabData.tab_id,
      "angle": 0,
      "left": parseFloat(optPosition[0]),
      "top": parseFloat(optPosition[1]),
      "customOption": 1,
      "layerno": tabData.tab_layer_no,
      "viewSide": currentView,
      "objType": 'color',
      "crossOrigin": 'anonymous',
      "canvasId": random_number,
      "objectCaching": false,
      "promizeClip": promizeClip,
      "boundaray": {
        "left": parseFloat(imageBoundaryValues[0]),
        "top": parseFloat(imageBoundaryValues[1]),
        "width": parseFloat(imageBoundaryValues[2]),
        "height": parseFloat(imageBoundaryValues[3])
      },
    }
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
  getCanvasClipartObject(option, tabData, currentView) {
    var random_number = Math.floor(Math.random() * 1000000);
    let imageBoundary = option.position;
    var imageBoundaryValues = imageBoundary.split(',');
    let overlay = this.props.customizer.pdoi.values
    let promizeClip = ''
    if (tabData.overlay_image_id && overlay.length > 0 && tabData.overlay_position) {
      let overlayImage = overlay.find((o) => { return o.overlay_image_id == tabData.overlay_image_id })
      /** overlay Image */
      let overlayImageObj = (overlayImage ? JSON.parse(overlayImage.overlay_image) : {})
      let promizeClipImg = (overlayImageObj['side_' + currentView] ? this.props.promizeBaseImgURL + 'overlayimage/' + 'side_' + currentView + '/' + overlayImageObj['side_' + currentView] : '')

      /** overlay position */
      let overlayPosition = (tabData.overlay_position ? JSON.parse(tabData.overlay_position) : {})
      let offSets = overlayPosition['side_' + currentView];
      let [left, top] = offSets.split(',')
      promizeClip = {
        src: promizeClipImg,
        left: left,
        top: top
      }
    }
    return {
      ...this.state.movable,
      ...this.state.controlPoints,
      "name": "canvasView_" + tabData.tab_id,
      "angle": 0,
      "left": parseFloat(imageBoundaryValues[0]),
      "top": parseFloat(imageBoundaryValues[1]),
      "customOption": 1,
      "layerno": tabData.tab_layer_no,
      "viewSide": currentView,
      "objType": 'clipart',
      "crossOrigin": 'anonymous',
      "canvasId": random_number,
      "boundaray": {
        "left": parseFloat(imageBoundaryValues[0]),
        "top": parseFloat(imageBoundaryValues[1]),
        "width": parseFloat(imageBoundaryValues[2]),
        "height": parseFloat(imageBoundaryValues[3])
      },
      "objectCaching": false,
      "promizeClip": promizeClip
    }
  }
  getCanvasUploadImageObject(option, tabData, currentView) {
    var random_number = Math.floor(Math.random() * 1000000);
    let imageBoundary = option.boundary_position;
    let overlay = this.props.customizer.pdoi.values
    var imageBoundaryValues = imageBoundary.split(',');
    let promizeClip = ''
    if (tabData.overlay_image_id && overlay.length > 0 && tabData.overlay_position) {
      let overlayImage = overlay.find((o) => { return o.overlay_image_id == tabData.overlay_image_id })
      /** overlay Image */
      let overlayImageObj = (overlayImage ? JSON.parse(overlayImage.overlay_image) : {})
      let promizeClipImg = (overlayImageObj['side_' + currentView] ? this.props.promizeBaseImgURL + 'overlayimage/' + 'side_' + currentView + '/' + overlayImageObj['side_' + currentView] : '')

      /** overlay position */
      let overlayPosition = (tabData.overlay_position ? JSON.parse(tabData.overlay_position) : {})
      let offSets = overlayPosition['side_' + currentView];
      let [left, top] = offSets.split(',')
      promizeClip = {
        src: promizeClipImg,
        left: left,
        top: top
      }
    }
    return {
      ...this.state.movable,
      ...this.state.controlPoints,
      "name": "canvasView_" + tabData.tab_id,
      "left": parseFloat(imageBoundaryValues[0]),
      "top": parseFloat(imageBoundaryValues[1]),
      "angle": parseFloat(option.image_angle),
      "layerno": tabData.tab_layer_no,
      "objType": 'uploadimage',
      "viewSide": currentView,
      "crossOrigin": 'anonymous',
      "canvasId": random_number,
      "objectCaching": false,
      "boundaray": {
        "left": parseFloat(imageBoundaryValues[0]),
        "top": parseFloat(imageBoundaryValues[1]),
        "width": parseFloat(imageBoundaryValues[2]),
        "height": parseFloat(imageBoundaryValues[3])
      },
      "promizeClip": promizeClip
    }
  }
  getCanvasOverlayObject(option, tabData, currentView) {
    let overlay = this.props.customizer.pdoi.values;
    let promizeClip = '';
    if (tabData.overlay_image_id && overlay.length > 0 && tabData.overlay_position) {
      let overlayImage = overlay.find((o) => { return o.overlay_image_id == tabData.overlay_image_id })
      /** overlay Image */
      let overlayImageObj = (overlayImage ? JSON.parse(overlayImage.overlay_image) : {})
      let promizeClipImg = (overlayImageObj['side_' + currentView] ? this.props.promizeBaseImgURL + 'overlayimage/' + 'side_' + currentView + '/' + overlayImageObj['side_' + currentView] : '')

      /** overlay position */
      let overlayPosition = (tabData.overlay_position ? JSON.parse(tabData.overlay_position) : {})
      let offSets = overlayPosition['side_' + currentView];
      let [left, top] = offSets.split(',')
      promizeClip = {
        src: promizeClipImg,
        left: left,
        top: top
      }
      return promizeClip;
    }
  }
  getCanvasTextObject(textSetting, tabData, currentView) {
    var textDetail = textSetting['textDetail'];
    var fontColor = textSetting['fill'] || '#000';
    let textBoundaryValues = this.parsingBoundarayPosition(textDetail.boundary_position)
    return {
      ...this.state.movable,
      ...this.state.controlPoints,
      name: "canvasView_" + textDetail.tab_id,
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
      viewSide: currentView,
      prevData: '',
      breakWords: false,
      fontWeight: 'normal',
      textDecoration: 'none',
      underline: false,
      bringToFront: true,
      editable: false,
      selectable: true,
      hasControls: true,
      objType: 'text',
    }
  }

  promizeCanvasImage(defaultOptions, currentView, scaleValue, canvasside) {
    defaultOptions.map((option, index) => {
      var object;
      var canvas = canvasside.getItemByName("canvasView_" + option.tabData.tab_id);
      var incanvas = canvas ? true : false;
      if (option.option_color) {
        object = option.object ? option.object : this.getCanvasColorObject(option, option.tabData, currentView);
        this.promizeColorOption(option, option.tabData, incanvas, canvasside, object, currentView);
      } else if (option.promize_clipart_category_images_id) {
        object = option.object ? option.object : this.getCanvasClipartObject(option, option.tabData, currentView);
        currentView == option.object.viewSide && this.promizeClipartOption(option, option.tabData, incanvas, canvasside, object, currentView);
      } else if (option.option_pattern) {
        object = option.object ? option.object : this.getCanvasPatternObject(option, option.tabData, currentView);
        if (object.viewSide != currentView) {
          let overlayObject = this.getCanvasOverlayObject(option, option.object, currentView);
          object = {
            ...object,
            promizeClip: overlayObject
          }
        }
        this.promizePatternOption(option, option.tabData, incanvas, canvasside, object, currentView);
      } else if (option.image_setting_id) {
        object = option.object ? option.object : this.getCanvasUploadImageObject(option, option.tabData, currentView);
        currentView == option.object.viewSide && this.promizeUploadImageOption(option, option.tabData, option.object.src, canvasside, object, currentView);
      } else if (option.tab_id) {
        currentView == option.object.viewSide && this.promizeText(option, option.tabData, false, canvasside);
      } else {
        object = option.object ? option.object : this.getCanvasOptionObject(option, option.tabData, currentView);
        this.promizeImageOption(option, option.tabData, incanvas, canvasside, object, currentView);
      }
    });
  }
  removeObjectFromCanvas(canvasside, objectToRemove) {
    var canvasObject = canvasside.getItemById(objectToRemove.canvasId)
    canvasside.remove(canvasObject);
    canvasside.renderAll();
  }

  /**
 * Canvas Init Functions
 */
  canvasInit() {
    var canvasside = this.props.canvasside;
    //var deleteClipartFromCanvas = this.removeObjectFromCanvas;
    let removeOptionFromDefaultOptions = this.props.removeOptionFromDefaultOptions;
    var canvasObjectCallback = this.props.canvasObjectCallback;
    canvasside.on('object:scaling', e => canvasObjectCallback(e.target, "scaling"))
      .on('object:moving', e => canvasObjectCallback(e.target, "moving"))
      .on('object:added', e => canvasObjectCallback(e.target, "added"))
    fabric.Canvas.prototype._getActionFromCorner = function (target, corner, e) {
      if (!corner) {
        return 'drag';
      }
      switch (corner) {
        case 'mtr':
          return 'rotate';
        case 'ml':
        case 'mr':
          return e[this.altActionKey] ? 'skewY' : 'scaleX';
        case 'mt':
        case 'mb':
          return e[this.altActionKey] ? 'skewX' : 'scaleY';
        case 'tl':
          var obj = canvasside.getActiveObject();
          removeOptionFromDefaultOptions(obj);
          return 'delete';
        default:
          return 'scale';
      }
    }
    // cursor pointer
    fabric.Canvas.prototype.getCornerCursor = function (t, e, i) {
      if (t == "tl") {
        return "pointer";
      } else {
        return this.defaultCursor;
      }
    },
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
  render() {
    return (
      <React.Fragment></React.Fragment>
    );
  }
}