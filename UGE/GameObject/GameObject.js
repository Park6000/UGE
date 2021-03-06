class GameObject {
  constructor(name='None', tag='none') {
    let tr = new Transform();
    tr.setGameObject(this);
    
		this.enable = true;
    this.components = [tr];
    this._transform = tr;
    
    this.name = name;
    this.tag = tag;
  }
  
  set name(name) {
    this._name = name;
  }
  
  set tag(tag) {
    this._tag = tag;
  }
  
  get name() {
    return this._name;
  }
  
  get tag() {
    return this._tag;
  }
  
  set transform(transform) {
    return new Error('[GameObject] Transform을 직접 바꿀 수는 없습니다.');
  }
  
  get transform() {
    return this._transform;
  }
  
  // Componen method
  addComponent(component) {
    if(component == undefined) return
    this.components.push(component);
    component.setGameObject(this);
		component.registered();
    return component;
  }
  
  removeComponent(component) {
    for(let i = 0; i < this.components.length; i++) {
      if(component == this.components[i]
        && this.transform != this.components[i]) {
          
        this.components.slice(i, 1);
        component.setGameObject(undefined);
        return true;
        
      }
    }
    
    return false;
  }
  
  getComponent(componentType) {
    for (let i = 0; i < this.components.length; i++) {
      if (componentType == this.components[i].type) 
        return this.components[i];
    }
    
    return undefined;
  }
  
  getComponents(componentType) {
    let result = [];
    for (let i = 0; i < this.components.length; i++) {
      if (componentType == this.components[i].type)
        result.push(this.components[i]);
    }
    
    return result;
  }
  
  // Overridd method
  awake() {}
  
  start() {}
  
  update() {}
  
  // Collision method
  onTriggerEnterColiision(/*Collider*/other) {
    
  }
  
  onTriggerStayColiision(/*Collider*/other) {
  
  }
  
  onTriggerExitColiision(/*Collider*/other) {
  
  }
}
