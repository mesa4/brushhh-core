class RemoteText {
	constructor(content, styles = {}, attributes = {}) {
		this.content = content;
		this.styles = styles;
		this.attributes = attributes;
	}

	createElement() {
		const element = document.createElement('span');
		element.textContent = this.content.text;

		if (Object.keys(this.styles).length) {
			Object.entries(this.styles).forEach(([key, value]) => {
				element.style[key] = value;
			})
		}

		return element;
	}

	getElement() {
		return this.createElement()
	}
}

export default RemoteText
