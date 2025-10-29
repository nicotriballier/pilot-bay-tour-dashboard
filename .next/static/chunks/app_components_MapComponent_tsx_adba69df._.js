(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/MapComponent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MapComponent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Popup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// Sam's Chowder House camera location (5 miles northeast: ~0.0725 degrees north, ~0.0735 degrees east)
const SAMS_CHOWDER_HOUSE = {
    lat: 37.2234,
    lon: -122.393
};
// Treasure Island video marker location (5 miles south: ~0.0725 degrees south)
const TREASURE_ISLAND_VIDEO = {
    lat: 37.8199,
    lon: -123.0535
};
// Lawrence Hall of Science location (5 miles north - approximately 0.0725 degrees latitude)
const LAWRENCE_HALL = {
    lat: 37.7325,
    lon: -122.065
};
// Custom icon for airports with code and weather data (no pin)
const createAirportIcon = (isSelected, code, name, weather)=>{
    var _weather_conditions, _weather_conditions1;
    const isClear = (weather === null || weather === void 0 ? void 0 : (_weather_conditions = weather.conditions) === null || _weather_conditions === void 0 ? void 0 : _weather_conditions.toUpperCase().includes('CLR')) || (weather === null || weather === void 0 ? void 0 : (_weather_conditions1 = weather.conditions) === null || _weather_conditions1 === void 0 ? void 0 : _weather_conditions1.toUpperCase().includes('CLEAR')) || (weather === null || weather === void 0 ? void 0 : weather.conditions) === 'CLR';
    const conditionsColor = isClear ? '#666' : '#ef4444';
    const zIndex = isSelected ? '1000' : 'auto';
    const weatherHtml = weather ? '\n    <div style="\n      background: white;\n      padding: 6px 8px;\n      border-radius: 4px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.2);\n      border: 2px solid #3b82f6;\n      white-space: nowrap;\n      font-size: 9px;\n      line-height: 1.3;\n      text-align: left;\n      min-width: 110px;\n      position: relative;\n      z-index: '.concat(zIndex, ';\n    ">\n      <div style="color: #000; font-weight: bold; font-size: 10px; margin-bottom: 3px;">').concat(code, '</div>\n      <div style="color: #000; font-weight: bold;">').concat(weather.tempC || 'N/A', '</div>\n      <div style="color: #666;">').concat(weather.wind || 'N/A', '</div>\n      <div style="color: #666;">').concat(weather.visibility || 'N/A', '</div>\n      <div style="color: ').concat(conditionsColor, "; font-weight: ").concat(isClear ? 'normal' : 'bold', ';">').concat(weather.conditions || 'N/A', '</div>\n      <div style="color: #999; font-size: 7px; margin-top: 2px;">').concat(weather.fetchedDate || 'N/A', "</div>\n    </div>\n  ") : '\n    <div style="\n      background: white;\n      padding: 6px 8px;\n      border-radius: 4px;\n      box-shadow: 0 2px 4px rgba(0,0,0,0.2);\n      border: 2px solid #3b82f6;\n      white-space: nowrap;\n      font-size: 9px;\n      text-align: left;\n      min-width: 110px;\n      position: relative;\n      z-index: '.concat(zIndex, ';\n    ">\n      <div style="color: #000; font-weight: bold; font-size: 10px;">').concat(code, '</div>\n      <div style="color: #999; font-size: 8px;">Loading...</div>\n    </div>\n  ');
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
        className: 'custom-airport-marker',
        html: weatherHtml,
        iconSize: [
            120,
            90
        ],
        iconAnchor: [
            60,
            45
        ],
        popupAnchor: [
            0,
            -45
        ]
    });
};
// Component to add combined camera image overlay (North and South)
function CameraOverlay() {
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CameraOverlay.useEffect": ()=>{
            const cameraIcon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
                className: 'camera-image-overlay',
                html: '\n        <div style="\n          background: white;\n          padding: 12px;\n          border-radius: 8px;\n          box-shadow: 0 4px 6px rgba(0,0,0,0.3);\n          border: 3px solid #10b981;\n        ">\n          <div style="display: flex; gap: 12px;">\n            <div>\n              <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Sam\'s Chowder House / KHAF (North)</div>\n              <img\n                src="https://cams.samschowderhouse.com/south.jpg?'.concat(Date.now(), '"\n                style="width: 432px; height: 324px; border-radius: 4px; display: block;"\n                alt="Camera feed North"\n              />\n            </div>\n            <div>\n              <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Sam\'s Chowder House / KHAF (South)</div>\n              <img\n                src="https://cams.samschowderhouse.com/north.jpg?').concat(Date.now(), '"\n                style="width: 432px; height: 324px; border-radius: 4px; display: block;"\n                alt="Camera feed South"\n              />\n            </div>\n          </div>\n        </div>\n      '),
                iconSize: [
                    907,
                    390
                ],
                iconAnchor: [
                    907,
                    195
                ]
            });
            overlayRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].marker([
                SAMS_CHOWDER_HOUSE.lat,
                SAMS_CHOWDER_HOUSE.lon
            ], {
                icon: cameraIcon
            }).addTo(map);
            // Refresh image every 30 seconds
            const interval = setInterval({
                "CameraOverlay.useEffect.interval": ()=>{
                    if (overlayRef.current) {
                        const updatedIcon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
                            className: 'camera-image-overlay',
                            html: '\n            <div style="\n              background: white;\n              padding: 12px;\n              border-radius: 8px;\n              box-shadow: 0 4px 6px rgba(0,0,0,0.3);\n              border: 3px solid #10b981;\n            ">\n              <div style="display: flex; gap: 12px;">\n                <div>\n                  <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Sam\'s Chowder House / KHAF (North)</div>\n                  <img\n                    src="https://cams.samschowderhouse.com/south.jpg?'.concat(Date.now(), '"\n                    style="width: 432px; height: 324px; border-radius: 4px; display: block;"\n                    alt="Camera feed North"\n                  />\n                </div>\n                <div>\n                  <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Sam\'s Chowder House / KHAF (South)</div>\n                  <img\n                    src="https://cams.samschowderhouse.com/north.jpg?').concat(Date.now(), '"\n                    style="width: 432px; height: 324px; border-radius: 4px; display: block;"\n                    alt="Camera feed South"\n                  />\n                </div>\n              </div>\n            </div>\n          '),
                            iconSize: [
                                907,
                                390
                            ],
                            iconAnchor: [
                                907,
                                195
                            ]
                        });
                        overlayRef.current.setIcon(updatedIcon);
                    }
                }
            }["CameraOverlay.useEffect.interval"], 30000);
            return ({
                "CameraOverlay.useEffect": ()=>{
                    clearInterval(interval);
                    if (overlayRef.current) {
                        map.removeLayer(overlayRef.current);
                    }
                }
            })["CameraOverlay.useEffect"];
        }
    }["CameraOverlay.useEffect"], [
        map
    ]);
    return null;
}
_s(CameraOverlay, "oCyDsmWvzq3e9YB9xPf6SEF7bwU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c = CameraOverlay;
// Component to add video overlay
function VideoOverlay() {
    _s1();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoOverlay.useEffect": ()=>{
            const videoIcon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
                className: 'video-overlay',
                html: '\n        <div style="\n          background: white;\n          padding: 12px;\n          border-radius: 8px;\n          box-shadow: 0 4px 6px rgba(0,0,0,0.3);\n          border: 3px solid #ef4444;\n        ">\n          <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Treasure Island</div>\n          <iframe\n            width="691"\n            height="389"\n            src="https://www.youtube.com/embed/BSWhGNXxT9A?autoplay=1&mute=1&loop=1&playlist=BSWhGNXxT9A"\n            title="YouTube video player"\n            frameBorder="0"\n            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"\n            allowFullScreen\n            style="border-radius: 4px; display: block;"\n          ></iframe>\n        </div>\n      ',
                iconSize: [
                    713,
                    464
                ],
                iconAnchor: [
                    357,
                    232
                ]
            });
            overlayRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].marker([
                TREASURE_ISLAND_VIDEO.lat,
                TREASURE_ISLAND_VIDEO.lon
            ], {
                icon: videoIcon
            }).addTo(map);
            return ({
                "VideoOverlay.useEffect": ()=>{
                    if (overlayRef.current) {
                        map.removeLayer(overlayRef.current);
                    }
                }
            })["VideoOverlay.useEffect"];
        }
    }["VideoOverlay.useEffect"], [
        map
    ]);
    return null;
}
_s1(VideoOverlay, "oCyDsmWvzq3e9YB9xPf6SEF7bwU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c1 = VideoOverlay;
// Component to add Lawrence Hall of Science overlay
function LawrenceHallOverlay() {
    _s2();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const overlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LawrenceHallOverlay.useEffect": ()=>{
            const lawrenceIcon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
                className: 'lawrence-image-overlay',
                html: '\n        <div style="\n          background: white;\n          padding: 12px;\n          border-radius: 8px;\n          box-shadow: 0 4px 6px rgba(0,0,0,0.3);\n          border: 3px solid #f59e0b;\n        ">\n          <div style="font-weight: bold; margin-bottom: 6px; font-size: 14px;">Lawrence Hall of Science</div>\n          <img\n            src="https://www.ocf.berkeley.edu/~thelawrence/images/newview.jpg"\n            style="width: 432px; height: 324px; border-radius: 4px; display: block;"\n            alt="Lawrence Hall view"\n          />\n        </div>\n      ',
                iconSize: [
                    454,
                    356
                ],
                iconAnchor: [
                    227,
                    356
                ]
            });
            overlayRef.current = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].marker([
                LAWRENCE_HALL.lat,
                LAWRENCE_HALL.lon
            ], {
                icon: lawrenceIcon
            }).addTo(map);
            return ({
                "LawrenceHallOverlay.useEffect": ()=>{
                    if (overlayRef.current) {
                        map.removeLayer(overlayRef.current);
                    }
                }
            })["LawrenceHallOverlay.useEffect"];
        }
    }["LawrenceHallOverlay.useEffect"], [
        map
    ]);
    return null;
}
_s2(LawrenceHallOverlay, "oCyDsmWvzq3e9YB9xPf6SEF7bwU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c2 = LawrenceHallOverlay;
function MapComponent(param) {
    let { airports, selectedAirport, onAirportSelect } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
        center: [
            37.55,
            -122.2
        ],
        zoom: 9.5,
        style: {
            height: '100%',
            width: '100%'
        },
        scrollWheelZoom: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }, void 0, false, {
                fileName: "[project]/app/components/MapComponent.tsx",
                lineNumber: 292,
                columnNumber: 7
            }, this),
            airports.map((airport)=>{
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                    position: [
                        airport.lat,
                        airport.lon
                    ],
                    icon: createAirportIcon(airport.code === selectedAirport, airport.code, airport.name, airport.weather),
                    zIndexOffset: airport.code === selectedAirport ? 1000 : 0,
                    eventHandlers: {
                        click: ()=>onAirportSelect(airport.code)
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-bold text-lg",
                                    children: airport.code
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MapComponent.tsx",
                                    lineNumber: 310,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm",
                                    children: airport.name
                                }, void 0, false, {
                                    fileName: "[project]/app/components/MapComponent.tsx",
                                    lineNumber: 311,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/MapComponent.tsx",
                            lineNumber: 309,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/MapComponent.tsx",
                        lineNumber: 308,
                        columnNumber: 13
                    }, this)
                }, airport.code, false, {
                    fileName: "[project]/app/components/MapComponent.tsx",
                    lineNumber: 299,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraOverlay, {}, void 0, false, {
                fileName: "[project]/app/components/MapComponent.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VideoOverlay, {}, void 0, false, {
                fileName: "[project]/app/components/MapComponent.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LawrenceHallOverlay, {}, void 0, false, {
                fileName: "[project]/app/components/MapComponent.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MapComponent.tsx",
        lineNumber: 286,
        columnNumber: 5
    }, this);
}
_c3 = MapComponent;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "CameraOverlay");
__turbopack_context__.k.register(_c1, "VideoOverlay");
__turbopack_context__.k.register(_c2, "LawrenceHallOverlay");
__turbopack_context__.k.register(_c3, "MapComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/MapComponent.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/components/MapComponent.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=app_components_MapComponent_tsx_adba69df._.js.map