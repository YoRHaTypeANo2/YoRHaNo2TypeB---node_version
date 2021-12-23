const { Bot, Message } = require('mirai-js');
// 机器人实例
const bot = new Bot();
// code
let code = '';
// 解析code函数
const Fun = new Function(code);
// 脏话
const DwordArr = ['铸币','猪鼻','啥b']
// good morning
const MwordArr = ['早','我起床了','哦哈呦','早上好']
// good night
const NwordArr = ['睡了','我睡了','睡觉了', '我睡觉了', '晚安', '睡觉']
// loginWord
const LwordArr = ['上号了','上了','我上了', '我上号了']
// 随机中枪数
let shootNum = Math.floor(Math.random()*6 + 1)
let isInshotting = false
let shotCount = 1
let PshootNum = Math.floor(Math.random()*6 + 1)
let PisInshotting = false
let PshotCount = 1
let FshootNum = Math.floor(Math.random()*6 + 1)
let FisInshotting = false
let FshotCount = 1
let isLoading = false
let fixTime = ''
let fixMan = ''
// 
const init = async function() {
	// 连接到一个 mirai-api-http 服务
	console.log('尝试连接bot')
	await bot.open({
		baseUrl: 'http://101.35.107.18:9090',
		authKey: 'WWWWQQQQ',
		// 要绑定的 qq，须确保该用户已在 mirai-console 登录
		qq: 2817323351,
	});
	console.log('链接成功')
	console.log('发送成功消息')
	await bot.sendMessage({
		// 群号
		group: '977380104',
		// 是 http server 接口所需的原始格式，若提供则优先使用
		message: [
		 { type: 'Plain', text: 'init success'}
	 ],
	});
	// 监听群消息的事件
	bot.on('GroupMessage', async data => {
		if(isLoading) return
		// 通用属性定义
		// 随机概率
		const randomNum = Math.random()*100
		console.log('随机数',randomNum)
		console.log(data.messageChain)
		const groupId = data.sender.group.id // 群号
		const userId = data.sender.id // 用户id
		const textObj = data.messageChain.find( 
			item => item.type === 'Plain'
		) // 消息对象
		const atObj = data.messageChain.find( 
			item => item.type === 'At'
		) // At对象
		const text = textObj && textObj.text // 消息
		const at = atObj && atObj.target // @对象
		console.log('at: ',at, 'text: ',text)
		// 通用消息回复
		// 概率发图回复
		if(randomNum <= 1) {
			console.log('触发随机')
			const filename = 'img/tjj.jpg'
			console.log('获取图片数据')
			let { url } = await bot.uploadImage({ filename });
			console.log('获取成功，发图',url)
			await bot.sendMessage({
				group: groupId,
				message: new Message().addImageUrl(url),
			});
		}
		// 脏话回复
		if(DwordArr.includes(text)) {
			await bot.sendMessage({
				group: groupId,
			  message: new Message().addText(text),
			});
		}
		// 早上回复
		if(MwordArr.includes(text)) {
			await bot.sendMessage({
				group: groupId,
				message: new Message().addText(
					userId === 2260904215 ? '2b早上好'
					: userId === 3451723268 ? '富婆早上好'
					: '早上好'
					)
			})
		}
		// code
		if(text.indexOf('code ') === 0) {
			console.log('???')
			if(userId === 2260904215 || userId === 1667270240 || userId === 849943464 || userId === 1315430008) {
				code  = `${text.replace('code ', '')}`
				console.log(code)
				try {
					// 
					let fun = new Function(code);
					let res = fun(code);
					console.log(res)
					if(res)
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText(res)
					})
				}
				catch(e) {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('你在写些什么鸡掰代码，出错了')
					})
				}
			} else {
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText(`你还莫得权限哦`)
				})
			}
		}
		// 计算回复
		if(text.indexOf('计算 ') === 0) {
			let str = text.replace('计算 ','')
			try {
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText(`计算结果： ${eval(str)}`)
				})
			}
			catch(e) {
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText('淦我报错了，你在算些什么鸡掰')
				})
			}
		}
		// restart
		if(text === '距离zrq生日还有多久') {
			let word = ''
			const days = Math.ceil((new Date('2022/09/11 00:00:00').getTime() - new Date().getTime()) / 86400 / 1000)
			if( days <= 0) {
				word = '今天就是zrq生日哈哈哈，生日快乐'
			} else {
				word = `距离zrq的生日还有${days}天`
			}
			await bot.sendMessage({
				group: groupId,
				message: new Message().addText(word)
			})
		}
		if(text === '距离2b生日还有多久') {
			let word = ''
			const days = Math.ceil((new Date('2022/02/14 00:00:00').getTime() - new Date().getTime()) / 86400 / 1000)
			if( days <= 0) {
				word = '今天就是2b生日哈哈哈'
			} else {
				word = `距离2b的生日还有${days}天`
			}
			await bot.sendMessage({
				group: groupId,
				message: new Message().addText(word)
			})
		}
		if(text === '2b自我维修') {
			if(userId === 2260904215 || userId === 3451723268) {
				isLoading = true
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText('开始系统检查...')
				})
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText(`上次维修时间：${fixTime || '无'}`)
				})
				fixTime = new Date().toLocaleString()
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText(`上次启用维修的人：${fixMan || '无'}`)
				})
				fixMan = userId
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText('除Warframe功能以外其他功能暂停使用')
				})
				setTimeout( async () => {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('记忆单元：正常')
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('系统核心：正常')
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('初始化策略日志')
					})
				},1000)
				setTimeout( async () => {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('加载Warframe数据...')
					})
				},2000)
				setTimeout( async () => {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('剩余电量： 100%')
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('黑匣子温度：正常')
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('黑匣子内部压强，正常')
					})
				},3000)
				setTimeout( async () => {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('激活IFF')
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('激活FCS')
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('激活辅助器连接')
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('激活惯性控制系统')
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('启动DBU设置')
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('激活环境传感器')
					})
				},4000)
				setTimeout( async () => {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('装备验证： 完成')
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('装备状态： 正常')
					})
				}, 5000)
				setTimeout( async () => {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('所有系统正常')
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('寄叶B型2号机战斗准备完成，维修结束')
					})
					isLoading = false
				}, 6000)
			} else {
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText('你没有操作权限哦')
				})
			}
		}
		// rm
		if(text === 'rm') {
			await bot.sendMessage({
				group: groupId,
				message: new Message().addText('riven.market')
			})
		}
		// fpee
		if(at === 3451723268) {
			const filename = 'img/fpee.jpg'
				console.log('获取图片数据')
				let { url } = await bot.uploadImage({ filename });
				console.log('获取成功，发图',url)
				await bot.sendMessage({
    			group: groupId,
    			message: new Message().addImageUrl(url),
				});
		}
		if(at === 708827207) {
			const filename = 'img/pfans.jpg'
				console.log('获取图片数据')
				let { url } = await bot.uploadImage({ filename });
				console.log('获取成功，发图',url)
				await bot.sendMessage({
    			group: groupId,
    			message: new Message().addImageUrl(url),
				});
		}
		// ^^回复
		if(text === '^^') {
			const filename = 'img/haha.jpg'
			console.log('获取图片数据')
			let { url } = await bot.uploadImage({ filename });
			console.log('获取成功，发图',url)
			await bot.sendMessage({
				group: groupId,
				message: new Message().addImageUrl(url),
			});
		}
		// 透一下
		if (text.indexOf('给我透一下') > -1 && at === 2817323351) {
			console.log('获取图片数据')
			const filename = 'img/bbzl.jpg'
			let { url } = await bot.uploadImage({ filename });
			console.log('获取成功，发图',url)
			await bot.sendMessage({
				group: groupId,
				message: new Message().addImageUrl(url),
			});
		}
		// 睡觉回复
		if(NwordArr.includes(text)) {
			await bot.sendMessage({
				group: groupId,
				message: new Message().addText(
					userId === 2260904215 ? '2b晚安'
					: userId === 3451723268 ? '富婆晚安'
					: userId === 1657888533 ? '茉莉你睡鸡掰'
					: userId === 937774921 ? 'sark你睡鸡掰'
					: '晚安')
			})
		}
		// @qq 铸币回复
		if(at && (text.indexOf('铸币') !== -1 || text.indexOf('猪鼻') !== -1 )) {
			if(at === 3451723268) {
				const filename = 'img/bu.jpg'
				console.log('获取图片数据')
				let { url } = await bot.uploadImage({ filename });
				console.log('获取成功，发图',url)
				await bot.sendMessage({
    			group: groupId,
    			message: new Message().addImageUrl(url),
				});
				await bot.sendMessage({
					group: groupId,
					messageChain: new Message().addText('怎么可以骂富婆呢')
				})
				await bot.sendMessage({
					group: groupId,
					messageChain: new Message().addAt(data.sender.id).addText(text.indexOf('铸币') !== -1 ? ' 铸币' : ' 猪鼻')
				})
				return
			}
			if(at === 2817323351) {
				await bot.sendMessage({
					group: groupId,
					messageChain: new Message().addText('你骂我干嘛')
				})
				const filename = 'img/ma.gif'
				console.log('获取图片数据')
				let { url } = await bot.uploadImage({ filename });
				console.log('获取成功，发图',url)
				await bot.sendMessage({
    			group: groupId,
    			message: new Message().addImageUrl(url),
				});
				return
			}
			await bot.sendMessage({
				group: groupId,
				messageChain: new Message().addAt(atObj.target).addText(text.indexOf('铸币') !== -1 ? ' 铸币' : ' 猪鼻')
			})
		}
	// 	[
  // { type: 'Source', id: 333, time: 1632371470 },
  // { type: 'At', target: 2817323351, display: '' },
  // { type: 'Plain', text: ' 铸币' }
	// 	]
	// if(data.messageChain)
		// 上号回复
		if(LwordArr.includes(text)) {
			await bot.sendMessage({
				group: groupId,
				message: new Message().addText(userId === 2260904215 ? '你终于能上号了' : userId === 3451723268 ? '富婆上号了' : '好了你可以下了')
			})
		}
		if(text === '铸币2b' && userId === 2260904215) {
			await bot.sendMessage({
				group: groupId,
			  messageChain: new Message().addText('？让我自己骂自己 猪鼻吧').getMessageChain()
			});
		}
		if(text === '铸币2b' && userId !== 2260904215) {
			await bot.sendMessage({
				group: groupId,
			  messageChain: new Message().addText('你才铸币').getMessageChain()
			});
		}
		// flash专用
		if(groupId === 552595584) {
			if(text.indexOf('茉莉') !== -1 && (text.indexOf('铸币') !== -1 || text.indexOf('猪逼') !== -1 || text.indexOf('猪鼻') !== -1) && (userId === 2260904215 || userId === 937774921)) {
				await bot.sendMessage({
					group: groupId,
					messageChain: new Message().addAt(1657888533).addText(`${text.indexOf('猪鼻') !== -1 ? ' 猪鼻 ' :text.indexOf('猪逼') !== -1 ? ' 猪逼 ' : ' 铸币 '}`).getMessageChain()
				});
			}
			if(text.indexOf('sark') !== -1 && (text.indexOf('铸币') !== -1 || text.indexOf('猪逼') !== -1 || text.indexOf('猪鼻') !== -1) && (userId === 2260904215 || userId === 1657888533)) {
				await bot.sendMessage({
					group: groupId,
					messageChain: new Message().addAt(937774921).addText(`${text.indexOf('猪鼻') !== -1 ? ' 猪鼻 ' :text.indexOf('猪逼') !== -1 ? ' 猪逼 ' : ' 铸币 '}`).getMessageChain()
				});
			}
			if(text === '/俄罗斯转盘') {
				if(FisInshotting) {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('游戏已开始，请等待游戏结束')
					})
				}
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText('俄罗斯转盘模式已经开启，左轮里只有一颗子弹，输入 射我 来抽奖')
				})
				FisInshotting = true
			}
			if(text === '射我' && FisInshotting) {
				console.log(FshootNum)
				console.log(FshotCount)
				if(FshotCount === FshootNum) {
					FisInshotting = false
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(userId).addText(userId === 3451723268 ? '  这发有子弹 你本来要寄了' : '砰！ 这发有子弹 你寄了')
					})
					if(userId === 3451723268) {
						await bot.sendMessage({
							group: groupId,
							message: new Message().addText('但是2b跟我说不能让你寄')
						})
					}
					if(userId === 1657888533 || userId === 937774921) {
						await bot.sendMessage({
							group: groupId,
							message: new Message().addText(userId === 1657888533 ?'是茉莉寄了啊 哈哈哈哈哈哈哈哈哈哈哈哈哈' : '是sark寄了啊 哈哈哈哈哈哈哈哈哈哈哈哈哈')
						})
						const filename = 'img/wuguihaha.jpg'
						console.log('获取图片数据')
						let { url } = await bot.uploadImage({ filename });
						console.log('获取成功，发图',url)
						await bot.sendMessage({
							group: groupId,
							message: new Message().addImageUrl(url),
						});	
					}
					FshotCount = 1
					FshootNum = Math.floor(Math.random()*6 + 1)
					if(data.sender.permission === 'MEMBER') {
						await bot.mute({
							group:groupId,
							qq:userId,
							time:60
						})
					} else {
						await bot.sendMessage({
							group: groupId,
							message: new Message().addText(userId === 3451723268 ? '' : '狗管理我封不了啊啊啊啊啊啊啊啊啊啊啊')
						})
						const filename = 'img/ke.jpg'
							console.log('获取图片数据')
							let { url } = await bot.uploadImage({ filename });
							console.log('获取成功，发图',url)
							await bot.sendMessage({
								group: groupId,
								message: new Message().addImageUrl(url),
							});
					}
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText(userId === 3451723268 ? ' 那么游戏结束，我不能射富婆' : '  游戏结束,愿天堂也有wf  ').addAt(userId)
					})
				} else if (FshotCount !== FshootNum) {
					if(FshotCount > 6 ) {
						await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(2260904215).addText('  sb你程序出bug了,我重启了  ')
					})
					FshotCount = 1
					FshootNum = Math.floor(Math.random()*6 + 1)
					FisInshotting = false
					return
					}
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(userId).addText('  咔！ 这发没子弹 你活着')
					})
					console.log(FshootNum)
					console.log(FshotCount)
					FshotCount++
				} else {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(data.sender.id).addText('如果你看见了这个话说明这个啥b程序有bug').addAt(2260904215)
					})
				}
			}
		}
		// p佬群专用
		if(groupId === 288500440) {
			if(text === '/俄罗斯转盘') {
				if(PisInshotting) {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('游戏已开始，请等待游戏结束')
					})
				}
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText('俄罗斯转盘模式已经开启，左轮里只有一颗子弹，输入 射我 来抽奖')
				})
				PisInshotting = true
			}
			if(text === '射我' && PisInshotting) {
				console.log(PshootNum)
				console.log(PshotCount)
				if(PshotCount === PshootNum) {
					PisInshotting = false
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(userId).addText('  砰！ 这发有子弹 你寄了')
					})
					if(data.sender.permission === 'MEMBER') {
						await bot.mute({
							group:groupId,
							qq:userId,
							time:60
						})
					} else {
						await bot.sendMessage({
							group: groupId,
							message: new Message().addText('狗管理我封不了啊啊啊啊啊啊啊啊啊啊')
						})
						const filename = 'img/ke.jpg'
						console.log('获取图片数据')
						let { url } = await bot.uploadImage({ filename });
						console.log('获取成功，发图',url)
						await bot.sendMessage({
							group: groupId,
							message: new Message().addImageUrl(url),
						});
					}
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('  游戏结束,愿天堂也有wf  ').addAt(userId)
					})
					PshootNum = Math.floor(Math.random()*6 + 1)
					PshotCount = 1
					return
				} else if (PshotCount !== PshootNum) {
					if(PshotCount > 6 ) {
						await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(2260904215).addText('  sb你程序出bug了,我重启了  ')
					})
					PshotCount = 1
					PshootNum = Math.floor(Math.random()*6 + 1)
					PisInshotting = false
					return
					}
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(userId).addText(' 咔！ 这发没子弹 你活着')
					})
					console.log(PshootNum)
					console.log(PshotCount)
					PshotCount++
					return
				} else {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(data.sender.id).addText('如果你看见了这个话说明这个啥b程序有bug').addAt(2260904215)
					})
				}
			}
			// 暂时空着
		}
		// fa群专用
		if(groupId === 827907201) {
			// specialshine回复
			if((text === '@YoRHaNo2TypeB. 老婆(๑>؂<๑）') && (userId === 1746162928 || userId === 2260904215))  {
				await bot.sendMessage({
					group: groupId,
					messageChain: new Message().addText('我不是你老婆').getMessageChain()
				});
				const filename = 'img/ke.jpg'
				console.log('获取图片数据')
				let { url } = await bot.uploadImage({ filename });
				console.log('获取成功，发图',url)
				await bot.sendMessage({
    			group: groupId,
    			message: new Message().addImageUrl(url),
				});
			}
			// vv
			if(text === 'vv') {
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText('想让我叫vv帅哥？')
				})
				const filename = 'img/bu.jpg'
				console.log('获取图片数据')
				let { url } = await bot.uploadImage({ filename });
				console.log('获取成功，发图',url)
				await bot.sendMessage({
    			group: groupId,
    			message: new Message().addImageUrl(url),
				});
			}
			if(text === '/俄罗斯转盘') {
				if(isInshotting) {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('游戏已开始，请等待游戏结束')
					})
				}
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText('俄罗斯转盘模式已经开启，左轮里只有一颗子弹，输入 射我 来抽奖')
				})
				isInshotting = true
			}
			if(text === '射我' && isInshotting) {
				if(shotCount === shootNum) {
					isInshotting = false
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(userId).addText('  砰！ 这发有子弹 你寄了')
					})
					if(data.sender.permission === 'MEMBER') {
						await bot.mute({
							group:groupId,
							qq:userId,
							time:60
						})
					} else {
						await bot.sendMessage({
							group: groupId,
							message: new Message().addText('  狗管理我封不了啊啊啊啊啊啊啊啊  ')
						})
						const filename = 'img/ke.jpg'
							console.log('获取图片数据')
							let { url } = await bot.uploadImage({ filename });
							console.log('获取成功，发图',url)
							await bot.sendMessage({
								group: groupId,
								message: new Message().addImageUrl(url),
							});
					}
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText(' 游戏结束,愿天堂也有wf ').addAt(userId)
					})
					shotCount = 1
					shootNum = Math.floor(Math.random()*6 + 1)
				} else if (shotCount !== shootNum) {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(userId).addText('  咔！ 这发没子弹 你活着')
					})
					if(shotCount > 6 ) {
						await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(2260904215).addText('  sb你程序出bug了,我重启了  ')
					})
					shotCount = 1
					shootNum = Math.floor(Math.random()*6 + 1)
					isInshotting = false
					return
					}
					console.log(shootNum)
					console.log(shotCount)
					shotCount++
				} else {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(data.sender.id).addText('如果你看见了这个话说明这个啥b程序有bug').addAt(2260904215)
					})
				}
			}
		}
		// 测试群用
		if(groupId === 977380104) {
			if(text === '/俄罗斯转盘') {
				if(isInshotting) {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('游戏已开始，请等待游戏结束')
					})
				}
				await bot.sendMessage({
					group: groupId,
					message: new Message().addText('俄罗斯转盘模式已经开启，左轮里只有一颗子弹，输入 射我 来抽奖')
				})
				isInshotting = true
			}
			if(text === '射我' && isInshotting) {
				if(shotCount === shootNum) {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(userId).addText('  砰！ 这发有子弹 你寄了')
					})
					await bot.mute({
						group:groupId,
						qq:userId,
						time:60
					})
					await bot.sendMessage({
						group: groupId,
						message: new Message().addText('  游戏结束,愿天堂也有wf  ').addAt(userId)
					})
					await bot.unmute({
						group: groupId,
						qq: userId
					})
					shotCount = 1
					shootNum = Math.floor(Math.random()*6 + 1)
					isInshotting = false
					console.log(shootNum)
					console.log(shotCount)
					return
				} else if (shotCount !== shootNum) {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(userId).addText('  砰！ 这发没子弹 你活着  ')
					})
					console.log(shootNum)
					console.log(shotCount)
					shotCount++
					return
				} else {
					await bot.sendMessage({
						group: groupId,
						message: new Message().addAt(data.sender.id).addText('如果你看见了这个话说明这个啥b程序有bug').addAt(2260904215)
					})
				}
			}
		}
	});
}

init()
