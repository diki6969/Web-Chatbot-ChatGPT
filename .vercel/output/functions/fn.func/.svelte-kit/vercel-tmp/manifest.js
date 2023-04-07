export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.ef41cb2b.js","imports":["_app/immutable/entry/start.ef41cb2b.js","_app/immutable/chunks/index.72818363.js","_app/immutable/chunks/singletons.f57baa21.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.aa307236.js","imports":["_app/immutable/entry/app.aa307236.js","_app/immutable/chunks/index.72818363.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('../output/server/nodes/0.js'),
			() => import('../output/server/nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
