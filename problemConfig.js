// problemConfig.js

export const ProblemConfig = {
	// ゲームモード
	easy: {
		p1: {
			problems: [
				{
					title: 'p1の基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [],
							hint: [],
						},
					],
				},
			],
		},
		p2: {
			problems: [
				{
					title: 'p2の基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9],
							hint: [],
						},
						{
							problem: [1, 2],
							hint: [3, 4],
						},
					],
				},
				{
					title: 'p2の少し難しい問題',
					explanationId: 2,
					difficulty: 2,
					symbolSets: [
						{
							problem: [1],
							hint: [2, 3, 4],
						},
						{
							problem: [2],
							hint: [1, 3, 4],
						},
						{
							problem: [3],
							hint: [1, 2, 4],
						},
						{
							problem: [4],
							hint: [1, 2, 3],
						},
					],
				},
			],
		},
		pm: {
			problems: [
				{
					title: 'pmの基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 3],
							hint: [2],
						},
					],
				},
			],
		},
		pg: {
			problems: [
				{
					title: 'pgの基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2],
							hint: [3],
						},
					],
				},
			],
		},
		cm: {
			problems: [
				{
					title: 'cmの基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 3, 5],
							hint: [2, 4],
						},
					],
				},
			],
		},
		pmm: {
			problems: [
				{
					title: 'pmmの基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
							hint: [13, 14, 15],
						},
					],
				},
			],
		},
		p2mg: {
			problems: [
				{
					title: 'p2mgの基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [10, 11, 12, 13, 14],
							hint: [1, 2, 3, 4, 5, 6, 7, 8, 9],
						},
					],
				},
			],
		},
		pgg: {
			problems: [
				{
					title: 'pggの基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5],
							hint: [6, 7, 8, 9, 10],
						},
					],
				},
			],
		},
		cmm: {
			problems: [
				{
					title: 'cmmの基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
							hint: [15, 16, 17, 18, 19, 20, 21, 22, 23],
						},
					],
				},
			],
		},
		p4: {
			problems: [
				{
					title: 'p4の基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5],
							hint: [6, 7, 8, 9],
						},
					],
				},
			],
		},
		p4mm: {
			problems: [
				{
					title: 'p4mmの基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17],
							hint: [6, 7, 8, 9, 18, 19, 20, 21],
						},
					],
				},
			],
		},
		p4mg: {
			problems: [
				{
					title: 'p4mgの基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 10, 11, 12, 13],
							hint: [6, 7, 8, 9, 14, 15, 16, 17, 18, 19],
						},
					],
				},
			],
		},
		p3: {
			problems: [
				{
					title: 'p3の基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4],
							hint: [5, 6],
						},
					],
				},
			],
		},
		p3m1: {
			problems: [
				{
					title: 'p3m1の基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 7, 8, 9],
							hint: [5, 6, 10, 11],
						},
					],
				},
			],
		},
		p31m: {
			problems: [
				{
					title: 'p31mの基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 7, 8, 9, 10, 11],
							hint: [5, 6, 12, 13, 14, 15],
						},
					],
				},
			],
		},
		p6: {
			problems: [
				{
					title: 'p6の基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6],
							hint: [7, 8, 9, 10, 11],
						},
					],
				},
			],
		},
		p6mm: {
			problems: [
				{
					title: 'p6mmの基本問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
							hint: [5, 6, 7, 8, 9, 10, 11, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
						},
					],
				},
			],
		},
	},

	hard: {
		p1: {
			problems: [
				{
					title: 'p1の応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [],
							hint: [],
						},
					],
				},
			],
		},
		p2: {
			problems: [
				{
					title: 'p2の応用問題',
					explanationId: 2,
					difficulty: 2,
					symbolSets: [
						{
							problem: [1],
							hint: [2, 3, 4],
						},
						{
							problem: [2],
							hint: [1, 3, 4],
						},
						{
							problem: [3],
							hint: [1, 2, 4],
						},
						{
							problem: [4],
							hint: [1, 2, 3],
						},
					],
				},
			],
		},
		pm: {
			problems: [
				{
					title: 'pmの応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 3],
							hint: [2],
						},
					],
				},
			],
		},
		pg: {
			problems: [
				{
					title: 'pgの応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2],
							hint: [3],
						},
					],
				},
			],
		},
		cm: {
			problems: [
				{
					title: 'cmの応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3],
							hint: [4, 5],
						},
					],
				},
			],
		},
		pmm: {
			problems: [
				{
					title: 'pmmの応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9],
							hint: [10, 11, 12, 13, 14, 15],
						},
					],
				},
			],
		},
		p2mg: {
			problems: [
				{
					title: 'p2mgの応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9],
							hint: [10, 11, 12, 13, 14],
						},
					],
				},
			],
		},
		pgg: {
			problems: [
				{
					title: 'pggの応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5],
							hint: [6, 7, 8, 9, 10],
						},
					],
				},
			],
		},
		cmm: {
			problems: [
				{
					title: 'cmmの応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
							hint: [15, 16, 17, 18, 19, 20, 21, 22, 23],
						},
					],
				},
			],
		},
		p4: {
			problems: [
				{
					title: 'p4の応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5],
							hint: [6, 7, 8, 9],
						},
					],
				},
			],
		},
		p4mm: {
			problems: [
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17],
							hint: [6, 7, 8, 9, 18, 19, 20, 21],
						},
					],
				},
			],
		},
		p4mg: {
			problems: [
				{
					title: 'p4mgの応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 10, 11, 12, 13],
							hint: [6, 7, 8, 9, 14, 15, 16, 17, 18, 19],
						},
					],
				},
			],
		},
		p3: {
			problems: [
				{
					title: 'p3の応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4],
							hint: [5, 6],
						},
					],
				},
			],
		},
		p3m1: {
			problems: [
				{
					title: 'p3m1の応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 7, 8, 9],
							hint: [5, 6, 10, 11],
						},
					],
				},
			],
		},
		p31m: {
			problems: [
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 7, 8, 9, 10, 11],
							hint: [5, 6, 12, 13, 14, 15],
						},
					],
				},
			],
		},
		p6: {
			problems: [
				{
					title: 'p6の応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6],
							hint: [7, 8, 9, 10, 11],
						},
					],
				},
			],
		},
		p6mm: {
			problems: [
				{
					title: 'p6mmの応用問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
							hint: [5, 6, 7, 8, 9, 10, 11, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
						},
					],
				},
			],
		},
	},
	timeattack: {
		p1: {
			problems: [
				{
					title: 'p1の時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [],
							hint: [],
						},
					],
				},
			],
		},
		p2: {
			problems: [
				{
					title: 'p2の時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9],
							hint: [],
						},
						{
							problem: [1, 2],
							hint: [3, 4],
						},
					],
				},
				{
					title: 'p2の少し難しい問題',
					explanationId: 2,
					difficulty: 2,
					symbolSets: [
						{
							problem: [1],
							hint: [2, 3, 4],
						},
						{
							problem: [2],
							hint: [1, 3, 4],
						},
						{
							problem: [3],
							hint: [1, 2, 4],
						},
						{
							problem: [4],
							hint: [1, 2, 3],
						},
					],
				},
			],
		},
		pm: {
			problems: [
				{
					title: 'pmの時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 3],
							hint: [2],
						},
					],
				},
			],
		},
		pg: {
			problems: [
				{
					title: 'pgの時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2],
							hint: [3],
						},
					],
				},
			],
		},
		cm: {
			problems: [
				{
					title: 'cmの時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3],
							hint: [4, 5],
						},
					],
				},
			],
		},
		pmm: {
			problems: [
				{
					title: 'pmmの時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9],
							hint: [10, 11, 12, 13, 14, 15],
						},
					],
				},
			],
		},
		p2mg: {
			problems: [
				{
					title: 'p2mgの時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9],
							hint: [10, 11, 12, 13, 14],
						},
					],
				},
			],
		},
		pgg: {
			problems: [
				{
					title: 'pggの時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5],
							hint: [6, 7, 8, 9, 10],
						},
					],
				},
			],
		},
		cmm: {
			problems: [
				{
					title: 'cmmの時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
							hint: [15, 16, 17, 18, 19, 20, 21, 22, 23],
						},
					],
				},
			],
		},
		p4: {
			problems: [
				{
					title: 'p4の時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5],
							hint: [6, 7, 8, 9],
						},
					],
				},
			],
		},
		p4mm: {
			problems: [
				{
					title: 'p4mmの時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17],
							hint: [6, 7, 8, 9, 18, 19, 20, 21],
						},
					],
				},
			],
		},
		p4mg: {
			problems: [
				{
					title: 'p4mgの時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 10, 11, 12, 13],
							hint: [6, 7, 8, 9, 14, 15, 16, 17, 18, 19],
						},
					],
				},
			],
		},
		p3: {
			problems: [
				{
					title: 'p3の時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4],
							hint: [5, 6],
						},
					],
				},
			],
		},
		p3m1: {
			problems: [
				{
					title: 'p3m1の時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 7, 8, 9],
							hint: [5, 6, 10, 11],
						},
					],
				},
			],
		},
		p31m: {
			problems: [
				{
					title: 'p31mの時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 7, 8, 9, 10, 11],
							hint: [5, 6, 12, 13, 14, 15],
						},
					],
				},
			],
		},
		p6: {
			problems: [
				{
					title: 'p6の時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6],
							hint: [7, 8, 9, 10, 11],
						},
					],
				},
			],
		},
		p6mm: {
			problems: [
				{
					title: 'p6mmの時間制限問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
							hint: [5, 6, 7, 8, 9, 10, 11, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
						},
					],
				},
			],
		},
	},
	blind: {
		p1: {
			problems: [
				{
					title: 'p1のブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [],
							hint: [],
						},
					],
				},
			],
		},
		p2: {
			problems: [
				{
					title: 'p2のブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9],
							hint: [],
						},
						{
							problem: [1, 2],
							hint: [3, 4],
						},
					],
				},
				{
					title: 'p2の少し難しい問題',
					explanationId: 2,
					difficulty: 2,
					symbolSets: [
						{
							problem: [1],
							hint: [2, 3, 4],
						},
						{
							problem: [2],
							hint: [1, 3, 4],
						},
						{
							problem: [3],
							hint: [1, 2, 4],
						},
						{
							problem: [4],
							hint: [1, 2, 3],
						},
					],
				},
			],
		},
		pm: {
			problems: [
				{
					title: 'pmのブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 3],
							hint: [2],
						},
					],
				},
			],
		},
		pg: {
			problems: [
				{
					title: 'pgのブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2],
							hint: [3],
						},
					],
				},
			],
		},
		cm: {
			problems: [
				{
					title: 'cmのブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3],
							hint: [4, 5],
						},
					],
				},
			],
		},
		pmm: {
			problems: [
				{
					title: 'pmmのブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9],
							hint: [10, 11, 12, 13, 14, 15],
						},
					],
				},
			],
		},
		p2mg: {
			problems: [
				{
					title: 'p2mgのブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9],
							hint: [10, 11, 12, 13, 14],
						},
					],
				},
			],
		},
		pgg: {
			problems: [
				{
					title: 'pggのブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5],
							hint: [6, 7, 8, 9, 10],
						},
					],
				},
			],
		},
		cmm: {
			problems: [
				{
					title: 'cmmのブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
							hint: [15, 16, 17, 18, 19, 20, 21, 22, 23],
						},
					],
				},
			],
		},
		p4: {
			problems: [
				{
					title: 'p4のブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5],
							hint: [6, 7, 8, 9],
						},
					],
				},
			],
		},
		p4mm: {
			problems: [
				{
					title: 'p4mmのブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17],
							hint: [6, 7, 8, 9, 18, 19, 20, 21],
						},
					],
				},
			],
		},
		p4mg: {
			problems: [
				{
					title: 'p4mgのブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 10, 11, 12, 13],
							hint: [6, 7, 8, 9, 14, 15, 16, 17, 18, 19],
						},
					],
				},
			],
		},
		p3: {
			problems: [
				{
					title: 'p3のブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4],
							hint: [5, 6],
						},
					],
				},
			],
		},
		p3m1: {
			problems: [
				{
					title: 'p3m1のブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 7, 8, 9],
							hint: [5, 6, 10, 11],
						},
					],
				},
			],
		},
		p31m: {
			problems: [
				{
					title: 'p31mのブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 7, 8, 9, 10, 11],
							hint: [5, 6, 12, 13, 14, 15],
						},
					],
				},
			],
		},
		p6: {
			problems: [
				{
					title: 'p6のブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 5, 6],
							hint: [7, 8, 9, 10, 11],
						},
					],
				},
			],
		},
		p6mm: {
			problems: [
				{
					title: 'p6mmのブラインド問題',
					explanationId: 1,
					difficulty: 1,
					symbolSets: [
						{
							problem: [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
							hint: [5, 6, 7, 8, 9, 10, 11, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
						},
					],
				},
			],
		},
	},
};
