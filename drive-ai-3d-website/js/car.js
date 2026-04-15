class Car {
  constructor() {
    this.group = new THREE.Group();
    this.components = {};
    this.buildCar();
  }

  buildCar() {
    // Car body (chassis)
    const bodyGeom = new THREE.BoxGeometry(2, 1, 4.5);
    const bodyMat = new THREE.LineBasicMaterial({ color: 0x00D9FF, linewidth: 2 });
    const bodyWireframe = new THREE.EdgesGeometry(bodyGeom);
    const bodyLines = new THREE.LineSegments(bodyWireframe, bodyMat);
    this.group.add(bodyLines);
    this.components.body = bodyLines;

    // Engine (front section - box)
    const engineGeom = new THREE.BoxGeometry(2, 0.8, 1);
    const engineWireframe = new THREE.EdgesGeometry(engineGeom);
    const engineMat = new THREE.LineBasicMaterial({ color: 0x00D9FF });
    const engineLines = new THREE.LineSegments(engineWireframe, engineMat);
    engineLines.position.z = 1.75;
    this.group.add(engineLines);
    this.components.engine = engineLines;

    // Dashboard (top center)
    const dashboardGeom = new THREE.BoxGeometry(1.5, 0.6, 0.8);
    const dashboardWireframe = new THREE.EdgesGeometry(dashboardGeom);
    const dashboardMat = new THREE.LineBasicMaterial({ color: 0x00D9FF });
    const dashboardLines = new THREE.LineSegments(dashboardWireframe, dashboardMat);
    dashboardLines.position.y = 0.8;
    dashboardLines.position.z = 0.5;
    this.group.add(dashboardLines);
    this.components.dashboard = dashboardLines;

    // GPS/Antenna (top front)
    const gpsGeom = new THREE.ConeGeometry(0.15, 0.8, 8);
    const gpsWireframe = new THREE.EdgesGeometry(gpsGeom);
    const gpsMat = new THREE.LineBasicMaterial({ color: 0x00D9FF });
    const gpsLines = new THREE.LineSegments(gpsWireframe, gpsMat);
    gpsLines.position.y = 1.2;
    gpsLines.position.z = 1.5;
    this.group.add(gpsLines);
    this.components.gps = gpsLines;

    // Fuel tank (right side)
    const fuelGeom = new THREE.CylinderGeometry(0.3, 0.3, 2, 8);
    const fuelWireframe = new THREE.EdgesGeometry(fuelGeom);
    const fuelMat = new THREE.LineBasicMaterial({ color: 0x00D9FF });
    const fuelLines = new THREE.LineSegments(fuelWireframe, fuelMat);
    fuelLines.rotation.z = Math.PI / 2;
    fuelLines.position.x = 1;
    fuelLines.position.z = 0;
    this.group.add(fuelLines);
    this.components.fuel = fuelLines;

    // Speakers (rear section)
    const speakersGeom = new THREE.BoxGeometry(1.8, 0.6, 0.6);
    const speakersWireframe = new THREE.EdgesGeometry(speakersGeom);
    const speakersMat = new THREE.LineBasicMaterial({ color: 0x00D9FF });
    const speakersLines = new THREE.LineSegments(speakersWireframe, speakersMat);
    speakersLines.position.z = -1.75;
    speakersLines.position.y = 0.6;
    this.group.add(speakersLines);
    this.components.speakers = speakersLines;

    // Transmission (underbody)
    const transmissionGeom = new THREE.BoxGeometry(1.5, 0.3, 3);
    const transmissionWireframe = new THREE.EdgesGeometry(transmissionGeom);
    const transmissionMat = new THREE.LineBasicMaterial({ color: 0x00D9FF });
    const transmissionLines = new THREE.LineSegments(transmissionWireframe, transmissionMat);
    transmissionLines.position.y = -0.5;
    this.group.add(transmissionLines);
    this.components.transmission = transmissionLines;

    // Wheels
    const wheelGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 16);
    const wheelWireframe = new THREE.EdgesGeometry(wheelGeom);
    const wheelMat = new THREE.LineBasicMaterial({ color: 0x00D9FF });

    const wheelPositions = [
      { x: -0.8, z: 1.2 },
      { x: 0.8, z: 1.2 },
      { x: -0.8, z: -1.2 },
      { x: 0.8, z: -1.2 }
    ];

    wheelPositions.forEach((pos, idx) => {
      const wheelLines = new THREE.LineSegments(wheelWireframe, wheelMat.clone());
      wheelLines.rotation.z = Math.PI / 2;
      wheelLines.position.set(pos.x, -0.8, pos.z);
      this.group.add(wheelLines);
      this.components[`wheel${idx}`] = wheelLines;
    });

    this.group.scale.set(1, 1, 1);
    this.group.position.z = 0;
  }

  highlightComponent(componentName) {
    // Reset all components to cyan
    Object.keys(this.components).forEach(key => {
      this.components[key].material.color.setHex(0x00D9FF);
      this.components[key].material.linewidth = 2;
    });

    // Highlight the active component in orange
    if (this.components[componentName]) {
      this.components[componentName].material.color.setHex(0xD97B10);
      this.components[componentName].material.linewidth = 4;
    }
  }

  resetHighlight() {
    Object.keys(this.components).forEach(key => {
      this.components[key].material.color.setHex(0x00D9FF);
      this.components[key].material.linewidth = 2;
    });
  }

  getGroup() {
    return this.group;
  }
}
