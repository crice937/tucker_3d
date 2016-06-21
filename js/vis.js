    require([
      "esri/Map",
      "esri/views/SceneView",
      "esri/layers/FeatureLayer",
      "esri/renderers/SimpleRenderer",
      "esri/symbols/PolygonSymbol3D",
      "esri/symbols/ExtrudeSymbol3DLayer",
      "dojo/domReady!"
      ], function(
        Map, SceneView, FeatureLayer, SimpleRenderer, PolygonSymbol3D,
        ExtrudeSymbol3DLayer
        ) {

      /*****************************************************************
       * In this case we set two visual variables on the renderer. Since
       * we're defining both size and color based on data values, there's
       * no need to specify defaults in the `symbol` property of the 
       * renderer. In 3D it is easier to visually perceive size differences
       * when they are combined with color. Therefore we set up both a 
       * size and a color visual variable based on the values of the same
       * field. 
       * 
       * Notice that the data value ramps for each is slightly different.
       * Color allows us to see the spatial trend in a tight range, whereas
       * size can be used to observe nuances between features of the same
       * color.
       *****************************************************************/

       var renderer = new SimpleRenderer({
        symbol: new PolygonSymbol3D({
          symbolLayers: [new ExtrudeSymbol3DLayer()]
        }),
        label: "% population with health insurance",
        visualVariables: [{
          type: "size",
          field: "Pct_Pop_wHealth_Ins",
          //normalizationField: "Total_Population",
          stops: [
          {
            value: 70,
            size: 1000,
            label: "<70%"
          },
          {
            value: 75,
            size: 2000,
            label: ">75%"
          },
          {
            value: 80,
            size: 3000,
            label: ">80%"
          },
          {
            value: 85,
            size: 4000,
            label: ">85%"
          },          {
            value: 90,
            size: 5000,
            label: ">90%"
          },          {
            value: 95,
            size: 6000,
            label: ">95%"
          }]
        }, {
          type: "color",
          field: "Pct_Pop_wHealth_Ins",
          //normalizationField: "Total_Population",
          stops: [
          {
            value: 70,
            color: "#edf8e9",
            label: "<70%"
          },
          {
            value: 75,
            color: "#c7e9c0",
            label: ">75%"
          },
          {
            value: 80,
            color: "#a1d99b",
            label: ">80%"
          },
          {
            value: 85,
            color: "#74c476",
            label: ">85%"
          },
          {
            value: 90,
            color: "#31a354",
            label: ">90%"
          },
          {
            value: 95,
            color: "#006d2c",
            label: ">95%"
          }]
        }]
      });

       var povLyr = new FeatureLayer({
        url: "http://arcgis.atlantaregional.com/arcgis/rest/services/OpenData/FeatureServer/156/",
        renderer: renderer,
        outFields: ["*"],
        popupTemplate: {
          title: "Census Tract {NAME10}",
          content: "{Pct_Pop_wHealth_Ins}% of {Total_Population} have some variety of health coverage.",
          fieldInfos: [
          {
            fieldName: "Pct_Pop_wHealth_Ins",
            format: {
              digitSeparator: true,
              places: 0
            }
          }, {
            fieldName: "Total_Population",
            format: {
              digitSeparator: true,
              places: 0
            }
          }]
        }
      });

       var map = new Map({
        basemap: "gray",
        layers: [povLyr]
      });

       var view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
          position: {
            latitude: 18.24237,
            longitude: -88.72943,
            z: 1534560
          },
          tilt: 45,
          heading: 10
        }
      });

     });