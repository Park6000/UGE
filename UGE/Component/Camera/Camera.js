class Camera extends Component {
	constructor() {
    super();
  }
	
	/* Override Method */
  get type() {
    return ComponentType.Camera;
  }

  
	// 게임 오브젝트에 추가되었을 때 실행
	registered() {

	}
	
  // 매 프레임마다 실행되는 로직
  update() {
    
  }
}