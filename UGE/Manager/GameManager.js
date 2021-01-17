GameManager = {};
GameManager.GameObjectManager = new GameObjectManager();
GameManager.RenderManager = new RenderManager();

GameManager._ready = false;


GameManager.init = function(initValues) {
  // Init renderManager 
  let renderReady = GameManager.RenderManager.init(initValues.gameCanvasId, initValues.viewCanvasId);

  // Finish init 
  console.log('[GameManager] 게임을 초기화했습니다.');
  GameManager._ready = true;
  return;
}

GameManager.start = function() {
  // Check ready
  if(!GameManager._ready)
    throw new Error('[GameManager] 게임을 시작하기 위한 준비가 되지 않았습니다.');
  
  console.log('[GameManager] 게임을 시작했습니다.');
  UTime._lastTime = new Date().getTime();
  
  // Call awake method
  for (let i = 0; i < GameManager.GameObjectManager.gameObjectList.length; i++) {
    let obj = GameManager.GameObjectManager.gameObjectList[i];
    obj.awake();
  }
  
  // Call start method
  for (let i = 0; i < GameManager.GameObjectManager.gameObjectList.length; i++) {
    let obj = GameManager.GameObjectManager.gameObjectList[i];
    obj.start();
  }
  
  // New Frame
  requestAnimationFrame(GameManager._frame);
  return;
}

GameManager._frame = function() {
  // New frame
  requestAnimationFrame(GameManager._frame);
  
  // Set delta Time
  let curTime = new Date().getTime();
  UTime.deltaTime = (curTime - UTime._lastTime) / 1000;
  UTime._lastTime = curTime;
  
  let renderComponents = [];
  
  // Call update method
  for(let i = 0; i < GameManager.GameObjectManager.gameObjectList.length; i++) {
    let obj = GameManager.GameObjectManager.gameObjectList[i];
    obj.update();
    for(let j = 0; j < obj.components.length; j++) {
      let com = obj.components[j]
      com.update();
      
      // Push render Component
      if(UMath.checkRange(com.typeIndex, 2000, 2999))
        renderComponents.push(com);
    }
  }
  
  // Rendering
  GameManager.RenderManager.render(renderComponents);
}

// Time
let UTime = {};
UTime._lastTime = 0;
UTime.deltaTime = 0;

