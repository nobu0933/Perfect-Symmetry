// problemConfig.js

export const ProblemConfig = {
	// ゲームモード
	easy: {
		p1: {
			weight: 3,
			problems: [
				{
					title: 'p1の基本問題',
					explanationId: 1,
					difficulty: 1,
					needCount: 1,
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
			weight: 5,
			problems: [
				{
					title: 'p2の基本問題',
					explanationId: 1,
					difficulty: 1,
					needCount: 2,
					symbolSets: [
						{
							problem: [1, 2, 3, 4],
							hint: [9],
						},
						{
							problem: [5, 6, 7, 8],
							hint: [9],
						},
						{
							problem: [9],
							hint: [5, 6, 7, 8],
						},
						{
							problem: [9],
							hint: [1, 2, 3, 4],
						},
					],
				},
			],
		},
		pm: {
			weight: 2.5,
			problems: [
				{
					title: 'pmの基本問題',
					explanationId: 1,
					difficulty: 1,
					needCount: 2,
					symbolSets: [
						{
							problem: [1, 2],
							hint: [3],
						},
						{
							problem: [1, 3],
							hint: [2],
						},
						{
							problem: [2, 3],
							hint: [1],
						},
					],
				},
			],
		},
		pm_h: {
			weight: 2.5,
			problems: [
				{
					title: 'pmの基本問題',
					explanationId: 1, // 適宜調整してください
					difficulty: 1,
					needCount: 2,
					symbolSets: [
						{
							problem: [1, 2],
							hint: [3],
						},
						{
							problem: [1, 3],
							hint: [2],
						},
						{
							problem: [2, 3],
							hint: [1],
						},
					],
				},
			],
		},
		pg: {
			weight: 2.5,
			problems: [
				{
					title: 'pgの基本問題',
					explanationId: 1,
					difficulty: 1,
					needCount: 2,
					symbolSets: [
						{
							problem: [1, 2],
							hint: [3],
						},
						{
							problem: [1, 3],
							hint: [2],
						},
						{
							problem: [2, 3],
							hint: [1],
						},
					],
				},
			],
		},
		pg_h: {
			weight: 2.5,
			problems: [
				{
					title: 'pgの基本問題',
					explanationId: 1,
					difficulty: 1,
					needCount: 2,
					symbolSets: [
						{
							problem: [1, 2],
							hint: [3],
						},
						{
							problem: [1, 3],
							hint: [2],
						},
						{
							problem: [2, 3],
							hint: [1],
						},
					],
				},
			],
		},
		cm: {
			weight: 2.5,
			problems: [
				{
					title: 'cmの基本問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 4,
					symbolSets: [
						{
							problem: [1, 2, 4],
							hint: [3, 5],
						},
						{
							problem: [1, 2, 5],
							hint: [3, 4],
						},
						{
							problem: [1, 3, 4],
							hint: [2, 5],
						},
						{
							problem: [1, 3, 5],
							hint: [2, 4],
						},
						{
							problem: [2, 3, 4],
							hint: [1, 5],
						},
						{
							problem: [2, 3, 5],
							hint: [1, 4],
						},
					],
				},
			],
		},
		cm_h: {
			weight: 2.5,
			problems: [
				{
					title: 'cmの基本問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 4,
					symbolSets: [
						{
							problem: [1, 2, 4],
							hint: [3, 5],
						},
						{
							problem: [1, 2, 5],
							hint: [3, 4],
						},
						{
							problem: [1, 3, 4],
							hint: [2, 5],
						},
						{
							problem: [1, 3, 5],
							hint: [2, 4],
						},
						{
							problem: [2, 3, 4],
							hint: [1, 5],
						},
						{
							problem: [2, 3, 5],
							hint: [1, 4],
						},
					],
				},
			],
		},
		p2mm: {
			weight: 5,
			problems: [
				{
					title: 'p2mmの基本問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 4,
					symbolSets: [
						{
							problem: [10, 11, 12, 13, 14, 15],
							hint: [5],
						},
						{
							problem: [1, 10, 13],
							hint: [11, 12, 14, 15],
						},
						{
							problem: [5, 11, 14],
							hint: [10, 12, 13, 15],
						},
						{
							problem: [9, 12, 15],
							hint: [10, 11, 13, 14],
						},
						// {
						// 	problem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
						// 	hint: [13, 14, 15],
						// },
						// {
						// 	problem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 13, 14, 15],
						// 	hint: [10, 11, 12],
						// },
					],
				},
			],
		},
		// p2mg: {
		// 	weight: 5,
		// 	problems: [
		// 		{
		// 			title: 'p2mgの基本問題',
		// 			explanationId: 1,
		// 			difficulty: 1,
		// 			symbolSets: [
		// 				{
		// 					problem: [10, 11, 12, 13, 14],
		// 					hint: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// pgg: {
		// 	weight: 5,
		// 	problems: [
		// 		{
		// 			title: 'pggの基本問題',
		// 			explanationId: 1,
		// 			difficulty: 1,
		// 			symbolSets: [
		// 				{
		// 					problem: [1, 2, 3, 4, 5],
		// 					hint: [6, 7, 8, 9, 10],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// c2mm: {
		// 	weight: 5,
		// 	problems: [
		// 		{
		// 			title: 'c2mmの基本問題',
		// 			explanationId: 1,
		// 			difficulty: 1,
		// 			symbolSets: [
		// 				{
		// 					problem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
		// 					hint: [15, 16, 17, 18, 19, 20, 21, 22, 23],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		p4: {
			weight: 5,
			problems: [
				{
					title: 'p4の基本問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 4,
					symbolSets: [
						{
							problem: [1, 2, 3, 4],
							hint: [5],
						},
						{
							problem: [5],
							hint: [1, 2, 3, 4],
						},
					],
				},
			],
		},
		// p4mm: {
		// 	weight: 5,
		// 	problems: [
		// 		{
		// 			title: 'p4mmの基本問題',
		// 			explanationId: 1,
		// 			difficulty: 1,
		// 			symbolSets: [
		// 				{
		// 					problem: [1, 2, 3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17],
		// 					hint: [6, 7, 8, 9, 18, 19, 20, 21],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// p4mg: {
		// 	weight: 5,
		// 	problems: [
		// 		{
		// 			title: 'p4mgの基本問題',
		// 			explanationId: 1,
		// 			difficulty: 1,
		// 			symbolSets: [
		// 				{
		// 					problem: [1, 2, 3, 4, 5, 10, 11, 12, 13],
		// 					hint: [6, 7, 8, 9, 14, 15, 16, 17, 18, 19],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		p3: {
			weight: 5,
			problems: [
				{
					title: 'p3の基本問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 3,
					symbolSets: [
						{
							problem: [1, 2, 3, 4],
							hint: [5, 6],
						},
						{
							problem: [5, 6],
							hint: [1, 2, 3, 4],
						},
					],
				},
			],
		},
		// p3m1: {
		// 	weight: 5,
		// 	problems: [
		// 		{
		// 			title: 'p3m1の基本問題',
		// 			explanationId: 1,
		// 			difficulty: 1,
		// 			symbolSets: [
		// 				{
		// 					problem: [1, 2, 3, 4, 7, 8, 9],
		// 					hint: [5, 6, 10, 11],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// p31m: {
		// 	weight: 5,
		// 	problems: [
		// 		{
		// 			title: 'p31mの基本問題',
		// 			explanationId: 1,
		// 			difficulty: 1,
		// 			symbolSets: [
		// 				{
		// 					problem: [1, 2, 3, 4, 7, 8, 9, 10, 11],
		// 					hint: [5, 6, 12, 13, 14, 15],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		p6: {
			weight: 5,
			problems: [
				{
					title: 'p6の基本問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 6,
					symbolSets: [
						{
							problem: [1, 2, 3, 4],
							hint: [5, 6],
						},
					],
				},
			],
		},
		// p6mm: {
		// 	weight: 5,
		// 	problems: [
		// 		{
		// 			title: 'p6mmの基本問題',
		// 			explanationId: 1,
		// 			difficulty: 1,
		// 			symbolSets: [
		// 				{
		// 					problem: [1, 2, 3, 4, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
		// 					hint: [5, 6, 7, 8, 9, 10, 11, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
	},

	hard: {
		p1: {
			weight: 2,
			problems: [
				{
					title: 'p1の応用問題',
					explanationId: 1,
					difficulty: 1,
					needCount: 1,
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
			weight: 2,
			problems: [
				{
					title: 'p2の応用問題',
					explanationId: 2,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [9],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [5, 6, 7, 8],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'p2の応用問題',
					explanationId: 2,
					difficulty: 3,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 2,
								},
							],
						},
					],
				},
			],
		},
		pm: {
			weight: 1.25,
			problems: [
				{
					title: 'pmの応用問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		pm_h: {
			weight: 1.25,
			problems: [
				{
					title: 'pmの応用問題',
					explanationId: 1, // 適宜調整してください
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		pg: {
			weight: 1.25,
			problems: [
				{
					title: 'pgの応用問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		pg_h: {
			weight: 1.25,
			problems: [
				{
					title: 'pgの応用問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		cm: {
			weight: 1.25,
			problems: [
				{
					title: 'cmの応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [4, 5],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		cm_h: {
			weight: 1.25,
			problems: [
				{
					title: 'cmの応用問題',
					explanationId: 1,
					difficulty: 1,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [4, 5],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p2mm: {
			weight: 5,
			problems: [
				{
					title: 'p2mmの応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p2mg: {
			weight: 5,
			problems: [
				{
					title: 'p2mgの応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p2mgの応用問題',
					explanationId: 1,
					difficulty: 4,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 2,
								},
								{
									pool: [10, 11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		pgg: {
			weight: 5,
			problems: [
				{
					title: 'pggの応用問題',
					explanationId: 1,
					difficulty: 4,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6, 7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 9, 10],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6, 7],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 9, 10],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'pggの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 2,
								},
								{
									pool: [5, 6, 7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 9, 10],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		c2mm: {
			weight: 5,
			problems: [
				{
					title: 'c2mmの応用問題',
					explanationId: 1,
					difficulty: 6,
					needCount: 8,
					symbolSets: [
						{
							// 頂点:1, 1/4:1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 21, 22, 23],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 21, 22, 23],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 頂点:1, 1/4:0, 鏡映⊥映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 22],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:1, 1/4:0, 鏡映⊥映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 0,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'c2mmの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 8,
					symbolSets: [
						{
							// 頂点:1, 1/4:1, 映進:1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 21, 22, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 0,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:0, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 0,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'c2mmの応用問題',
					explanationId: 1,
					difficulty: 8,
					needCount: 8,
					symbolSets: [
						{
							// 頂点:0, 1/4:1, 映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p4: {
			weight: 5,
			problems: [
				{
					title: 'p4の応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							rand: [
								{
									problem: 5,
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p4mm: {
			weight: 5,
			problems: [
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15, 16, 17],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 8,
					needCount: 8,
					symbolSets: [
						{
							// 鏡面2∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [16, 17],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 9,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15, 16, 17],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							// 鏡面1∠映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [16, 17],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [18, 21],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [19, 20],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 10,
					needCount: 8,
					symbolSets: [
						{
							// 鏡面1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [16, 17],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p4mg: {
			weight: 5,
			problems: [
				{
					title: 'p4mgの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [18, 19],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p4mgの応用問題',
					explanationId: 1,
					difficulty: 9,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [18, 19],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'p4mgの応用問題',
					explanationId: 1,
					difficulty: 10,
					needCount: 8,
					symbolSets: [
						{
							// 鏡映∠映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [14, 15, 16, 17],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [18, 19],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p3: {
			weight: 5,
			problems: [
				{
					title: 'p3の応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 3,
					symbolSets: [
						{
							// 頂点3回1
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 中央3回1
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p3m1: {
			weight: 5,
			problems: [
				{
					title: 'p3m1の応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 6,
					symbolSets: [
						{
							// 3回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 11],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [9, 10],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [9, 10],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [9, 10],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p31m: {
			weight: 5,
			problems: [
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 6,
					symbolSets: [
						{
							// 3回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 10],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 10],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 10],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 10,
					needCount: 6,
					symbolSets: [
						{
							// 3回1, 映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 11,
					needCount: 6,
					symbolSets: [
						{
							// 鏡映1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [12, 14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 鏡映1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 10],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 鏡映1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 12,
					needCount: 6,
					symbolSets: [
						{
							// 映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13],
									pCount: 2,
									hCount: 0,
								},
								{
									pool: [14, 15],
									pCount: 0,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p6: {
			weight: 5,
			problems: [
				{
					title: 'p6の応用問題',
					explanationId: 1,
					difficulty: 4,
					needCount: 6,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 2,
								},
							],
						},
					],
				},
				{
					title: 'p6の応用問題',
					explanationId: 1,
					difficulty: 9,
					// needCount: 6,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 1,
									hCount: 2,
								},
							],
						},
					],
				},
			],
		},
		p6mm: {
			weight: 5,
			problems: [
				{
					title: 'p6mmの応用問題',
					explanationId: 1,
					difficulty: 11,
					needCount: 12,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p6mmの応用問題',
					explanationId: 1,
					difficulty: 14,
					needCount: 12,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
	},
	timeattack: {
		p1: {
			weight: 5,
			problems: [
				{
					title: 'p1の応用問題',
					explanationId: 1,
					difficulty: 1,
					needCount: 1,
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
			weight: 5,
			problems: [
				{
					title: 'p2の応用問題',
					explanationId: 2,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [9],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [5, 6, 7, 8],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'p2の応用問題',
					explanationId: 2,
					difficulty: 3,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 2,
								},
							],
						},
					],
				},
			],
		},
		pm: {
			weight: 2.5,
			problems: [
				{
					title: 'pmの応用問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		pm_h: {
			weight: 2.5,
			problems: [
				{
					title: 'pmの応用問題',
					explanationId: 1, // 適宜調整してください
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		pg: {
			weight: 2.5,
			problems: [
				{
					title: 'pgの応用問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		pg_h: {
			weight: 2.5,
			problems: [
				{
					title: 'pgの応用問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		cm: {
			weight: 2.5,
			problems: [
				{
					title: 'cmの応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [4, 5],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		cm_h: {
			weight: 2.5,
			problems: [
				{
					title: 'cmの応用問題',
					explanationId: 1,
					difficulty: 1,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [4, 5],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p2mm: {
			weight: 5,
			problems: [
				{
					title: 'p2mmの応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p2mg: {
			weight: 5,
			problems: [
				{
					title: 'p2mgの応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p2mgの応用問題',
					explanationId: 1,
					difficulty: 4,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 2,
								},
								{
									pool: [10, 11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		pgg: {
			weight: 5,
			problems: [
				{
					title: 'pggの応用問題',
					explanationId: 1,
					difficulty: 4,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6, 7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 9, 10],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6, 7],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 9, 10],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'pggの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 2,
								},
								{
									pool: [5, 6, 7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 9, 10],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		c2mm: {
			weight: 5,
			problems: [
				{
					title: 'c2mmの応用問題',
					explanationId: 1,
					difficulty: 6,
					needCount: 8,
					symbolSets: [
						{
							// 頂点:1, 1/4:1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 21, 22, 23],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 21, 22, 23],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 頂点:1, 1/4:0, 鏡映⊥映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 22],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:1, 1/4:0, 鏡映⊥映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 0,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'c2mmの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 8,
					symbolSets: [
						{
							// 頂点:1, 1/4:1, 映進:1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 21, 22, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 0,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:0, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 0,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'c2mmの応用問題',
					explanationId: 1,
					difficulty: 8,
					needCount: 8,
					symbolSets: [
						{
							// 頂点:0, 1/4:1, 映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p4: {
			weight: 5,
			problems: [
				{
					title: 'p4の応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							rand: [
								{
									problem: 5,
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p4mm: {
			weight: 5,
			problems: [
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15, 16, 17],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 8,
					needCount: 8,
					symbolSets: [
						{
							// 鏡面2∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [16, 17],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 9,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15, 16, 17],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							// 鏡面1∠映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [16, 17],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [18, 21],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [19, 20],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 10,
					needCount: 8,
					symbolSets: [
						{
							// 鏡面1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [16, 17],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p4mg: {
			weight: 5,
			problems: [
				{
					title: 'p4mgの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [18, 19],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p4mgの応用問題',
					explanationId: 1,
					difficulty: 9,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [18, 19],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'p4mgの応用問題',
					explanationId: 1,
					difficulty: 10,
					needCount: 8,
					symbolSets: [
						{
							// 鏡映∠映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [14, 15, 16, 17],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [18, 19],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p3: {
			weight: 5,
			problems: [
				{
					title: 'p3の応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 3,
					symbolSets: [
						{
							// 頂点3回1
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 中央3回1
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p3m1: {
			weight: 5,
			problems: [
				{
					title: 'p3m1の応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 6,
					symbolSets: [
						{
							// 3回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 11],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [9, 10],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [9, 10],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [9, 10],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p31m: {
			weight: 5,
			problems: [
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 6,
					symbolSets: [
						{
							// 3回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 10],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 10],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 10],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 10,
					needCount: 6,
					symbolSets: [
						{
							// 3回1, 映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 11,
					needCount: 6,
					symbolSets: [
						{
							// 鏡映1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [12, 14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 鏡映1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 10],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 鏡映1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 12,
					needCount: 6,
					symbolSets: [
						{
							// 映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13],
									pCount: 2,
									hCount: 0,
								},
								{
									pool: [14, 15],
									pCount: 0,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p6: {
			weight: 5,
			problems: [
				{
					title: 'p6の応用問題',
					explanationId: 1,
					difficulty: 4,
					needCount: 6,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 2,
								},
							],
						},
					],
				},
				{
					title: 'p6の応用問題',
					explanationId: 1,
					difficulty: 9,
					// needCount: 6,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 1,
									hCount: 2,
								},
							],
						},
					],
				},
			],
		},
		p6mm: {
			weight: 5,
			problems: [
				{
					title: 'p6mmの応用問題',
					explanationId: 1,
					difficulty: 11,
					needCount: 12,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p6mmの応用問題',
					explanationId: 1,
					difficulty: 14,
					needCount: 12,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
	},
	blind: {
		p1: {
			weight: 5,
			problems: [
				{
					title: 'p1の応用問題',
					explanationId: 1,
					difficulty: 1,
					needCount: 1,
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
			weight: 5,
			problems: [
				{
					title: 'p2の応用問題',
					explanationId: 2,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [9],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [5, 6, 7, 8],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'p2の応用問題',
					explanationId: 2,
					difficulty: 3,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 2,
								},
							],
						},
					],
				},
			],
		},
		pm: {
			weight: 2.5,
			problems: [
				{
					title: 'pmの応用問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		pm_h: {
			weight: 2.5,
			problems: [
				{
					title: 'pmの応用問題',
					explanationId: 1, // 適宜調整してください
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		pg: {
			weight: 2.5,
			problems: [
				{
					title: 'pgの応用問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		pg_h: {
			weight: 2.5,
			problems: [
				{
					title: 'pgの応用問題',
					explanationId: 1,
					difficulty: 2,
					needCount: 2,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		cm: {
			weight: 2.5,
			problems: [
				{
					title: 'cmの応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [4, 5],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		cm_h: {
			weight: 2.5,
			problems: [
				{
					title: 'cmの応用問題',
					explanationId: 1,
					difficulty: 1,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [4, 5],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p2mm: {
			weight: 5,
			problems: [
				{
					title: 'p2mmの応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p2mg: {
			weight: 5,
			problems: [
				{
					title: 'p2mgの応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p2mgの応用問題',
					explanationId: 1,
					difficulty: 4,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 2,
								},
								{
									pool: [10, 11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		pgg: {
			weight: 5,
			problems: [
				{
					title: 'pggの応用問題',
					explanationId: 1,
					difficulty: 4,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6, 7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 9, 10],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6, 7],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 9, 10],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'pggの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 2,
								},
								{
									pool: [5, 6, 7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 9, 10],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		c2mm: {
			weight: 5,
			problems: [
				{
					title: 'c2mmの応用問題',
					explanationId: 1,
					difficulty: 6,
					needCount: 8,
					symbolSets: [
						{
							// 頂点:1, 1/4:1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 21, 22, 23],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 21, 22, 23],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 頂点:1, 1/4:0, 鏡映⊥映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 22],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:1, 1/4:0, 鏡映⊥映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 0,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'c2mmの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 8,
					symbolSets: [
						{
							// 頂点:1, 1/4:1, 映進:1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 21, 22, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 0,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:0, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 0,
									hCount: 0,
								},
							],
						},
						{
							// 頂点:0, 1/4:1, 鏡映||映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [17, 18, 19],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [20, 22],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'c2mmの応用問題',
					explanationId: 1,
					difficulty: 8,
					needCount: 8,
					symbolSets: [
						{
							// 頂点:0, 1/4:1, 映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17, 18, 19],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [20, 22],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [21, 23],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p4: {
			weight: 5,
			problems: [
				{
					title: 'p4の応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 4,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							rand: [
								{
									problem: 5,
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p4mm: {
			weight: 5,
			problems: [
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15, 16, 17],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 8,
					needCount: 8,
					symbolSets: [
						{
							// 鏡面2∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [16, 17],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 9,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15, 16, 17],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							// 鏡面1∠映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [16, 17],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [18, 21],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [19, 20],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'p4mmの応用問題',
					explanationId: 1,
					difficulty: 10,
					needCount: 8,
					symbolSets: [
						{
							// 鏡面1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [16, 17],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [18, 19, 20, 21],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p4mg: {
			weight: 5,
			problems: [
				{
					title: 'p4mgの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [18, 19],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p4mgの応用問題',
					explanationId: 1,
					difficulty: 9,
					needCount: 8,
					symbolSets: [
						{
							// 4回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [14, 15, 16, 17],
									pCount: 0,
									hCount: 0,
								},
								{
									pool: [18, 19],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
				{
					title: 'p4mgの応用問題',
					explanationId: 1,
					difficulty: 10,
					needCount: 8,
					symbolSets: [
						{
							// 鏡映∠映進
							rand: [
								{
									pool: [1, 2, 3, 4, 5],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [6, 7, 8, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [10, 11, 12, 13],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [14, 15, 16, 17],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [18, 19],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p3: {
			weight: 5,
			problems: [
				{
					title: 'p3の応用問題',
					explanationId: 1,
					difficulty: 3,
					needCount: 3,
					symbolSets: [
						{
							// 頂点3回1
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 中央3回1
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
		p3m1: {
			weight: 5,
			problems: [
				{
					title: 'p3m1の応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 6,
					symbolSets: [
						{
							// 3回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 11],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [9, 10],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [9, 10],
									pCount: 1,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [9, 10],
									pCount: 1,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p31m: {
			weight: 5,
			problems: [
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 7,
					needCount: 6,
					symbolSets: [
						{
							// 3回1, 鏡映1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 10],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [8, 10],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
						{
							// 鏡映∠
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 10],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 10,
					needCount: 6,
					symbolSets: [
						{
							// 3回1, 映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 11,
					needCount: 6,
					symbolSets: [
						{
							// 鏡映1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 9],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [12, 14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 鏡映1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [8, 10],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [13, 14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 鏡映1∠映進1
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [11],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [12, 13],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p31mの応用問題',
					explanationId: 1,
					difficulty: 12,
					needCount: 6,
					symbolSets: [
						{
							// 映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [14, 15],
									pCount: 1,
									hCount: 0,
								},
							],
						},
						{
							// 映進2
							rand: [
								{
									pool: [1, 2, 3, 4, 5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13],
									pCount: 2,
									hCount: 0,
								},
								{
									pool: [14, 15],
									pCount: 0,
									hCount: 0,
								},
							],
						},
					],
				},
			],
		},
		p6: {
			weight: 5,
			problems: [
				{
					title: 'p6の応用問題',
					explanationId: 1,
					difficulty: 4,
					needCount: 6,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 2,
								},
							],
						},
					],
				},
				{
					title: 'p6の応用問題',
					explanationId: 1,
					difficulty: 9,
					// needCount: 6,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 1,
									hCount: 0,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 1,
									hCount: 2,
								},
							],
						},
					],
				},
			],
		},
		p6mm: {
			weight: 5,
			problems: [
				{
					title: 'p6mmの応用問題',
					explanationId: 1,
					difficulty: 11,
					needCount: 12,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
									pCount: 0,
									hCount: 1,
								},
							],
						},
					],
				},
				{
					title: 'p6mmの応用問題',
					explanationId: 1,
					difficulty: 14,
					needCount: 12,
					symbolSets: [
						{
							rand: [
								{
									pool: [1, 2, 3, 4],
									pCount: 1,
									hCount: 1,
								},
								{
									pool: [5, 6],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [7, 8, 9, 10, 11],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
									pCount: 0,
									hCount: 1,
								},
								{
									pool: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
									pCount: 1,
									hCount: 1,
								},
							],
						},
					],
				},
			],
		},
	},
};
