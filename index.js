class RemoteText {
	constructor(content) {
		this.content = content;
	}

	getElement() {
		const element = document.createElement('span');
		element.textContent = this.content.text;

		return element;
	}
}

class RemoteImage {
	constructor(content) {
		this.content = content;
	}

	getElement() {
		const element = document.createElement('img');
		element.src = this.content.url;

		return element;
	}
}

class RemoteElement {
	constructor({type, content = {}, styles = {}, attributes = {}}) {
		this.type = type;
		this.content = content;
		this.element = this.createElementByType();
		this.styles = styles;
		this.attributes = attributes;

		this.initStyles();
		this.initAttributes();
	}

	createElementByType() {
		const elementTypeMap = {
			TEXT: RemoteText,
			IMAGE: RemoteImage
		};

		return new elementTypeMap[this.type](this.content).getElement();
	}

	initStyles() {
		if (Object.keys(this.styles).length) {
			Object.entries(this.styles).forEach(([key, value]) => {
				this.element.style[key] = value;
			})
		}
	}

	initAttributes() {
		if (Object.keys(this.attributes).length) {
			Object.entries(this.attributes).forEach(([key, value]) => {
				this.element.setAttribute(key, value)
			})
		}
	}

	getElement() {
		return this.element
	}
}

class RemoteSlot {
	constructor(data) {
		this.data = data;
		this.elementWrpapper = this.findSelfAsElement();

		this.init();
	}

	findSelfAsElement() {
		return document.querySelector(`[remote-id="${this.data.id}"]`);
	}

	init() {
		if (!this.data) {
			throw new Error(`can't find data`)
		}

		const element = new RemoteElement(this.data);
		this.elementWrpapper.attachShadow({ mode: 'open' })
		this.elementWrpapper.shadowRoot.appendChild(element.getElement())
	}
}

export default RemoteSlot
