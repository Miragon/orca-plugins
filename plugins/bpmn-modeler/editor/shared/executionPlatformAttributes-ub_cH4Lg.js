import "./src-BMjhMR6_.js";
import { v as _defineProperty } from "./editorLayout-CIvAyzRC.js";
import { l as executionPlatformAttributeNames, s as MODELER_NAMESPACE_URI } from "../bpmn/main.js";
// ../../packages/bpmn-modeler/src/modeler/domain/executionPlatformAttributes.ts
var ExecutionPlatformAttributes = class {
	constructor(definitions) {
		_defineProperty(this, "definitions", void 0);
		this.definitions = definitions;
	}
	read() {
		const registeredPrefix = this.definitions.$model.getPackage(MODELER_NAMESPACE_URI)?.prefix;
		if (registeredPrefix === void 0) return this.definitions.$attrs;
		return this.readTypedUnder(registeredPrefix);
	}
	version() {
		const attributes = this.read();
		return attributes[executionPlatformAttributeNames(Object.entries(attributes).map(([name, value]) => ({
			name,
			value
		}))).version];
	}
	readTypedUnder(prefix) {
		const names = executionPlatformAttributeNames([{
			name: `xmlns:${prefix}`,
			value: MODELER_NAMESPACE_URI
		}]);
		const attributes = { [names.namespace]: MODELER_NAMESPACE_URI };
		for (const name of [names.platform, names.version]) {
			const value = this.definitions.get(name);
			if (typeof value === "string") attributes[name] = value;
		}
		return attributes;
	}
};
export { ExecutionPlatformAttributes as t };

//# sourceMappingURL=executionPlatformAttributes-ub_cH4Lg.js.map