
// ══════════════════════════════════════════════════
// KNOWLEDGE BASE
// ══════════════════════════════════════════════════
const LENORMAND={
  1:{name:"騎士",kw:"吉報, スピーディ, 新しい出会い, 訪問者",pos:"吉報到来, チャンスの訪れ, 素早い展開",neg:"焦り, 衝動的行動, 落ち着きのなさ",love:"好きな人からの連絡・新しい出会いの訪れ",work:"良い知らせ・採用通知・商談成立",rel:"新しい人物の登場・久しぶりの再会"},
  2:{name:"クローバー",kw:"小さな幸運, チャンス, 希望, 一時的な喜び",pos:"ラッキーな偶然, 小さな幸せの積み重ね",neg:"一時的・長続きしない幸運",love:"小さなときめき・偶然の出会いのチャンス",work:"思わぬ好機・小さな成功",rel:"軽い縁・楽しい一時的なつながり"},
  3:{name:"船",kw:"旅行, 移動, 新しい冒険, 海外, 遠方",pos:"新しい世界への出発・遠方との縁",neg:"不安定・漂流・方向性の不明確さ",love:"遠距離恋愛・旅先での縁・出会いの場が遠い",work:"出張・海外関連・転職や転勤",rel:"遠方の人・外国人との縁"},
  4:{name:"家",kw:"家族, 安定, プライベート, 基盤, 安心",pos:"安定した基盤・家族の絆・安心な環境",neg:"閉鎖的・外に出られない・家の問題",love:"家庭的なパートナー・同棲・結婚生活",work:"在宅ワーク・家業・安定した職場環境",rel:"家族的なつながり・プライベートな関係"},
  5:{name:"樹木",kw:"健康, 生命力, 成長, 過去の繋がり, 時間",pos:"じっくり根付く成長・長期的な健康",neg:"成長が遅い・慢性的な問題・時間がかかる",love:"長い時間をかけて育む関係・古い縁の復活",work:"長期的プロジェクト・じっくり育つキャリア",rel:"長年の縁・深く根付いた人間関係"},
  6:{name:"雲",kw:"混乱, 不確実性, 不安, 一時的トラブル, 曖昧さ",pos:"一時的な混乱（晴れる前の曇り）",neg:"判断困難・不安定・答えが見えない",love:"関係の不透明さ・相手の気持ちがわからない",work:"状況不確か・判断を急がない方が良い時期",rel:"誤解・すれ違い・曖昧な関係",special:"左側のカード→展望あり・改善兆候。右側のカード→悪化や停滞などネガティブを意味する"},
  7:{name:"蛇",kw:"嫉妬, 裏切り, ライバル, 誘惑, 複雑な問題",pos:"知恵・問題解決能力・変容の力",neg:"嫉妬・裏切り・ライバルの存在・誘惑",love:"三角関係・嫉妬・誘惑・複雑な恋愛事情",work:"職場内の複雑な人間関係・競合・裏切り",rel:"信頼できない人物・嫉妬深い関係",special:"蛇＋ネズミ(No.23)が隣接→捕食者ルール適用"},
  8:{name:"棺",kw:"終わり, 大きな変化, 病気, 損失, 一時停止",pos:"古いものの浄化・必要な終わり・変容の始まり",neg:"喪失・強制終了・悲しい別れ（健康面は医療専門家に相談を）",love:"関係の終わり・別れ・失恋",work:"プロジェクト終了・退職・仕事の終わり",rel:"縁の終わり・関係性の大きな変化"},
  9:{name:"花束",kw:"喜び, 感謝, 贈り物, 魅力, お祝い",pos:"喜ばしい出来事・愛情表現・感謝される",neg:"表面的な美しさ・短命な喜び",love:"愛の表現・デート・サプライズ・告白",work:"評価される・昇進・プレゼンの成功",rel:"感謝・プレゼント・和やかな集まり"},
  10:{name:"鎌",kw:"突然の終わり, 決断, 切断, 警告, 収穫",pos:"決断力・不要なものを断ち切る・収穫",neg:"突然の衝撃・危険・唐突な終わり",love:"突然の別れ・関係をスパッと切る決断",work:"突然の解雇・強制終了・思い切った決断",rel:"関係の突然の断絶"},
  11:{name:"鞭",kw:"争い, 議論, トラブル, 繰り返す, 自己研鑽",pos:"継続的な努力・トレーニング・向上心",neg:"口論・繰り返すトラブル・精神的ストレス",love:"喧嘩・繰り返す言い争い・情熱的すぎる関係",work:"ストレスの多い環境・激務・反復作業",rel:"摩擦・言い合い・活発すぎる議論"},
  12:{name:"鳥",kw:"コミュ力, 噂話, ペア, おしゃべり, SNS",pos:"活発なコミュニケーション・好ましい噂",neg:"悪い噂・ゴシップ・不安な会話",love:"彼/彼女との会話・SNSでのやりとり",work:"プレゼン・交渉・SNSマーケティング",rel:"おしゃべりな関係・情報の共有"},
  13:{name:"子ども",kw:"新しい始まり, 無邪気, 未熟さ, 若さ, 小さなもの",pos:"フレッシュなスタート・純粋さ・可能性",neg:"未熟・無責任・経験不足",love:"新しい恋・まだ始まったばかりの関係",work:"新プロジェクト開始・新入社員",rel:"新しい友人・子供との縁"},
  14:{name:"キツネ",kw:"嘘, 策略, 仕事, 警戒, 賢さ",pos:"賢い判断・戦略的行動・仕事での成功",neg:"欺瞞・小さな嘘・自分本位の行動・罠",love:"不誠実な相手・駆け引き・本音が見えない",work:"競合との駆け引き・賢い仕事術・注意が必要な取引",rel:"信頼し切れない人・表裏がある人",special:"キツネ＋ネズミ(No.23)が隣接→捕食者ルール適用"},
  15:{name:"熊",kw:"権力, 保護, 上司・母親, 力強さ, 財産",pos:"強力な後ろ盾・財力・守護者",neg:"独占欲・支配的・過保護・圧力",love:"保護してくれるパートナー・年上の縁・独占欲の強い相手",work:"上司・権力者との関係・財務面での安定",rel:"権力を持つ人・母性的な存在"},
  16:{name:"星",kw:"希望, 夢, インスピレーション, 展望, 指針",pos:"理想が明確になる・見通しが立つ・進む方向が定まる",neg:"空想的・非現実的な期待・遠すぎる理想",love:"理想が合う相手・将来像を共有できる縁",work:"目標が見える仕事・発想力を活かした働き方",rel:"価値観が合うつながり・先を見据えた関係"},
  17:{name:"コウノトリ",kw:"変化, 引っ越し, 誕生, 改善, 移動",pos:"前向きな変化・進化・ステージアップ",neg:"落ち着きのない変化・根無し草",love:"関係のステージアップ・交際開始・妊娠",work:"転職・昇進・新しい環境への移動",rel:"関係性の変化・引っ越しによる縁の変化"},
  18:{name:"犬",kw:"友情, 信頼, パートナー, 忠誠, 支援者",pos:"信頼できる友人・忠実なパートナー",neg:"依存・盲目的な信頼",love:"信頼できる恋人・友達から恋人へ",work:"頼れる同僚・メンター・チームワーク",rel:"長年の友人・心からの信頼関係"},
  19:{name:"塔",kw:"公共機関, 孤独, 権威, 企業, 高い目標",pos:"自立・高い地位・社会的成功",neg:"孤立・孤独感・感情的距離",love:"距離のある関係・自立した関係・孤独感",work:"大企業・公共機関・高い目標への挑戦",rel:"距離を置いた関係・権威ある人物との縁"},
  20:{name:"庭園",kw:"公共の場, コミュニティ, イベント, 人脈, 社交",pos:"社交的な場・人脈の広がり・楽しいイベント",neg:"人前での失態・秘密が公になる",love:"出会いの場・SNSでの出会い・公になる関係",work:"人脈作り・パーティー・公的なビジネス",rel:"広いコミュニティ・グループでの交流"},
  21:{name:"山",kw:"障害, 困難, 遅延, 壁, 克服すべき課題",pos:"越えれば大きな成長・試練を通じた強さ",neg:"大きな障害・停滞・時間がかかる問題",love:"関係の壁・距離・乗り越えるべき試練",work:"大きな課題・停滞・困難なプロジェクト",rel:"人間関係の壁・難しい相手"},
  22:{name:"道",kw:"選択, 分岐点, 決断, 多様な選択肢, 迷い",pos:"可能性・自由な選択・岐路に立つ機会",neg:"迷い・優柔不断・どちらを選べばいいかわからない",love:"恋の選択・複数の相手・どの道を選ぶか",work:"転職か継続か・複数の選択肢・キャリアの岐路",rel:"誰を選ぶか・グループ内での立ち位置"},
  23:{name:"ネズミ",kw:"損失, ストレス, 減少, 小さなトラブル, 盗難",pos:"警告を受け取って損失を防ぐ・注意喚起",neg:"じわじわ失う・ストレスの蓄積・消耗",love:"関係がじわじわ悪化・エネルギーを奪う相手",work:"業績の低下・仕事の減少・ストレスフルな環境",rel:"エネルギーを消耗させる関係・陰で悪影響を与える人",special:"蛇(No.7)/キツネ(No.14)と隣接時→捕食者ルール適用。単独時→通常解釈（損失・消耗の警告）"},
  24:{name:"ハート",kw:"愛, 情熱, 感情, 恋愛, ロマンス",pos:"愛の訪れ・深い感情的つながり",neg:"感情的すぎる・失恋・傷つきやすい",love:"恋愛のメインカード・愛情・告白・恋の始まり",work:"好きな仕事・情熱を持てる職場",rel:"深い感情的つながり・心からの友情"},
  25:{name:"指輪",kw:"契約, 約束, 結婚, 絆, 繰り返すサイクル",pos:"結婚・深い約束・長続きする縁",neg:"束縛・不倫浮気・逃れられない関係",love:"結婚・婚約・深いコミットメント",work:"長期契約・業務提携・正社員の約束",rel:"深い絆・公式な関係",special:"⑤中央より左側→ネガティブ（束縛・浮気）、右側→ポジティブ（結婚・深い約束）"},
  26:{name:"本",kw:"秘密, 知識, 学問, 隠されたもの, 未発見の事実",pos:"学びの機会・隠れた才能の発見",neg:"秘密・隠し事・まだ明かされない真実",love:"相手の秘密・隠れた気持ち",work:"専門知識・資格取得・隠れたビジネスチャンス",rel:"秘密を抱えた人・まだ知らない一面"},
  27:{name:"手紙",kw:"メッセージ, 書類, ニュース, コミュニケーション",pos:"朗報・公式な知らせ・書類の進展",neg:"悪いニュース・遅れる連絡・書類トラブル",love:"好きな人からのメッセージ・連絡の有無",work:"仕事の書類・契約書・重要なメール",rel:"連絡・情報のやりとり"},
  28:{name:"紳士",kw:"男性, 質問者(男性), 重要な男性, パートナー",pos:"",neg:"",love:"",work:"",rel:"",special:"男性相談者の場合、9枚引きの⑤に事前配置。質問者自身（男性）または重要な男性を示す"},
  29:{name:"淑女",kw:"女性, 質問者(女性), 重要な女性, パートナー",pos:"",neg:"",love:"",work:"",rel:"",special:"女性相談者の場合、9枚引きの⑤に事前配置。質問者自身（女性）または重要な女性を示す"},
  30:{name:"百合",kw:"平和, 純粋さ, 年長者, 性愛, 成熟",pos:"深い信頼・成熟した愛・癒しの関係",neg:"性的な誘惑・不倫や浮気・年齢差の問題",love:"成熟した愛・年上との恋・長年のパートナー",work:"経験豊富な先輩・長年の実績",rel:"年長者・師匠的存在・長年の信頼関係"},
  31:{name:"太陽",kw:"成功, 活力, 幸福, 勝利, ポジティブ",pos:"明るい未来・大きな成功・活力の高まり",neg:"過信・燃え尽き・目立ちすぎる",love:"幸せな恋愛・明るい関係・成就",work:"大きな成功・達成・輝かしい実績",rel:"明るく輝く存在・周囲を照らすリーダー"},
  32:{name:"月",kw:"直感, 感情, 名誉, ロマンス, 無意識",pos:"直感の精度向上・名誉・感受性の高まり",neg:"気分の波・夢想・感情の揺れ",love:"ロマンティックな雰囲気・直感で感じる愛",work:"クリエイティブな仕事・評判",rel:"感受性豊かな人・夜に深まる縁"},
  33:{name:"鍵",kw:"解決策, 重要なこと, 成功の鍵, 核心, ひらめき",pos:"問題解決・扉が開く・答えが出る",neg:"鍵を失う・タイミングを逃す",love:"関係の核心・次の一手・問題解決のヒント",work:"成功の鍵・重要な決断・突破口",rel:"関係の核心・重要人物"},
  34:{name:"魚",kw:"豊かさ, お金, ビジネス, 流れ, 自立",pos:"財力・ビジネスの好調・豊かさの流れ",neg:"浪費・流されすぎる・不安定な収入",love:"経済的に自立した恋人・物質的な豊かさ",work:"金銭的成功・ビジネスの拡大・独立",rel:"お金が絡む関係・ビジネスパートナー"},
  35:{name:"錨",kw:"安定, 固定, 仕事, 長期的目標, 安心感",pos:"安定した仕事・継続力・地に足のついた状態",neg:"停滞・変化できない・執着",love:"安定した長い関係・地に足のついたパートナー",work:"長期的な仕事・継続中のキャリア・安定雇用",rel:"長く続く安定した関係"},
  36:{name:"十字架",kw:"重責, 試練, 背負ってきた課題, 苦痛, 価値観",pos:"責任の意味が整理される・乗り越えた先で視界が開ける",neg:"重い試練・抱え込みすぎ・苦しみが続く",love:"負荷の大きい関係・向き合うべき課題がある縁",work:"責任の重い仕事・プレッシャー・試される時期",rel:"簡単には切れない関係・長く背負ってきた課題"},
};
const ORACLE={
  1:{name:"The Guide",msg:"自分の信じる方向を示し、迷っている人や状況に新しい道筋を作ってください。",essence:"始まり・意志・独立",keywords:["先駆け","自発性","リーダーシップ","開拓"],shadow:"独りよがりになりやすく、人の意見を聞けないときに孤立する。",note:"1は全ての行動の起点。自分の意志で道を選ぶ力を象徴し、迷いが続くときは「自分が一番したいことは何か」に立ち返ることで突破口が開く。",master:false},
  2:{name:"The Supporter",msg:"前に出るよりも支える役割に徹することで、物事は静かに好転していきます。",essence:"調和・協力・感受性",keywords:["共感","柔軟性","バランス","つながり"],shadow:"自己主張を抑えすぎて不満が蓄積し、他者依存に陥りやすい。",note:"2は対極を結ぶ数。互いを補い合う関係性の力。過度に合わせすぎると自分を失うため、相手を尊重しながら自分の軸も保つことが鍵。",master:false},
  3:{name:"The Innocent",msg:"難しく考えすぎず、純粋な気持ちと楽しさを大切に行動してください。",essence:"表現・喜び・創造",keywords:["好奇心","明るさ","コミュニケーション","創意"],shadow:"飽きっぽく浅く広がりがちで、言葉が軽くなるときがある。",note:"3は創造と表現の数。楽しさが止まると創造力も止まるため、義務感より「面白い」を優先することが成長を加速させる。",master:false},
  4:{name:"The Diligent",msg:"焦らず努力を積み重ねることで、揺るがない基盤が築かれていきます。",essence:"安定・忍耐・構築",keywords:["誠実","継続","実直","信頼"],shadow:"頑固さや完璧主義が変化への抵抗になり、柔軟性が失われやすい。",note:"4は大地の数。着実に形を作り上げる力を持つ。地道な積み上げこそがこの数の真価を発揮させる。",master:false},
  5:{name:"The Adventurer",msg:"未知の選択を恐れず、新しい体験の中に成長のチャンスを見つけてください。",essence:"自由・変化・探求",keywords:["行動力","適応","多様性","刺激"],shadow:"落ち着かなさや衝動性が判断を乱し、中途半端な結果を生みやすい。",note:"5は変化と自由の数。変化を恐れて同じ場所に留まると、この数の持つ可能性がすべて眠ったままになる。",master:false},
  6:{name:"The Caregiver",msg:"誰かを思いやる行動が、巡り巡って自分の安心と愛を深めます。",essence:"愛・奉仕・責任",keywords:["温かさ","調和","家族","誠意"],shadow:"世話のしすぎや干渉によって、自分と相手の境界が曖昧になりやすい。",note:"6は愛と責任の数。無条件の自己犠牲は燃え尽きを生むため、与えることと受け取ることのバランスが不可欠。",master:false},
  7:{name:"The Artisan",msg:"自分の感性や技術を磨き、内面から生まれる価値を形にしてください。",essence:"内省・精神・専門性",keywords:["洞察","真理探求","直感","深化"],shadow:"孤立しがちで、人との距離を置きすぎると孤独感が強まる。",note:"7は内なる探求の数。深く考えすぎて行動が止まるときは「考えは後、まず一歩」が突破のヒントになる。",master:false},
  8:{name:"The Warrior",msg:"覚悟を決めて行動することで、現実はあなたの味方になります。",essence:"力・達成・現実化",keywords:["決断力","実行力","影響力","豊かさ"],shadow:"支配的になりやすく、力への執着が人間関係を壊すことがある。",note:"8は達成の数。覚悟と行動が重なった瞬間にエネルギーが動き始める。「何のための力か」を問い直すことが安定の鍵。",master:false},
  9:{name:"The Sage",msg:"経験から得た知恵を使い、物事を広い視点で受け止めてください。",essence:"完成・博愛・手放し",keywords:["慈悲","普遍性","成熟","統合"],shadow:"手放しへの抵抗や殉教者的傾向が生まれ、自己を犠牲にしすぎる。",note:"9は完成点。執着を手放すほど新しい流れが起動し、古いものを抱え込むほど次のサイクルが遅れる。",master:false},
  10:{name:"The Great Power",msg:"新しい力の流れが始まっているため、自分の可能性を制限しないでください。",essence:"刷新・転換・新局面",keywords:["再起動","チャンス","転換期","可能性"],shadow:"変化の波に乗れず過去に縛られると、チャンスが素通りしていく。",note:"10は1+0のサイクルの再始動。個の力が新しい次元へ移行するタイミングを示しており、より高い段階への転換が求められている。",master:false},
  11:{name:"The Inspired One",msg:"直感やひらめきを手がかりにすると、重要な手がかりが見えてきます。",essence:"霊感・啓示・使命",keywords:["直感","インスピレーション","理想","覚醒"],shadow:"過敏さや神経的緊張が高まりやすく、地に足がつかない感覚に陥ることがある。",note:"11はマスターナンバー。霊的な感受性と高次の直感を宿す精神的メッセンジャー。頭でなく感覚を信頼することで力が開花する。",master:true},
  12:{name:"The Harmonizer",msg:"対立や違いを調整し、全体のバランスを整える役割を意識してください。",essence:"調整・奉仕・受容",keywords:["バランス","仲介","包容","受容"],shadow:"自分を後回しにしすぎて、気がつけば誰かのために消耗している。",note:"12は受け入れと調整の数（1+2=3）。自分が通り道になることで流れを整える局面を示す。",master:false},
  13:{name:"The Wise King",msg:"冷静な判断と責任ある行動によって、周囲に安定をもたらしてください。",essence:"秩序・判断・変容",keywords:["成熟","権威","責任","変革"],shadow:"頑固さと変化への恐怖が重なると、時代遅れのやり方に固執してしまう。",note:"13（1+3=4）は変容と再生の数。古いものを壊して新しい土台を作る強力な変化の力を持つ。",master:false},
  14:{name:"The Transformer",msg:"変化を受け入れ、自分自身をより高い形へと更新してください。",essence:"節制・統合・錬金術",keywords:["適応","中庸","調整","バランス"],shadow:"極端な行動や衝動が周囲との調和を崩し、変化を台無しにする。",note:"14（1+4=5）は変化と節制が交差する数。過剰と不足の間で最適な形を探し続けることが本質的な課題。",master:false},
  15:{name:"The Servant",msg:"誰かの役に立つ行動が、結果として大きな意味を生みます。",essence:"奉仕・魅力・影響",keywords:["気前のよさ","表現","貢献","温かさ"],shadow:"物質的なものや承認欲求に引きずられ、本来の動機が曇りやすい。",note:"15（1+5=6）は6の愛の力と5の行動力が合わさった数。動機が純粋であるほど返ってくるものが大きい。",master:false},
  16:{name:"The Perceptive One",msg:"物事の本質を見抜くために、表面ではなく内側を観察してください。",essence:"洞察・崩壊・再生",keywords:["真実","内省","本質把握","見直し"],shadow:"予期しない崩壊や気づきが痛みを伴うため、現実逃避に走りやすい。",note:"16（1+6=7）は7の探求心に「突然の崩壊と再生」が加わった数。崩れることを恐れないことが再生の出発点。",master:false},
  17:{name:"The Benefactor",msg:"与えることを惜しまない姿勢が、豊かな流れを呼び込みます。",essence:"希望・回復・寛大さ",keywords:["寛大","再生","未来への信頼","啓発"],shadow:"理想と現実の乖離に落胆し、エネルギーが内向きに枯れていくことがある。",note:"17（1+7=8）は8の現実化する力に希望が組み合わさった数。暗い時期に光を保ち続ける力を持つ。",master:false},
  18:{name:"The Seeker",msg:"まだ見えていない答えを求めて、学びと探求を続けてください。",essence:"深層・幻想・真実探求",keywords:["探求","潜在意識","直感","本能"],shadow:"疑念や不安が強まると幻想と現実の区別が難しくなり、判断が曇る。",note:"18（1+8=9）は9の統合力に月の神秘と潜在意識が重なる数。内側と外側の対話を続けることが鍵。",master:false},
  19:{name:"The Unwavering One",msg:"困難があっても信念を曲げず進むことで道は開かれます。",essence:"意志の勝利・太陽・完成",keywords:["成功","意志力","自信","輝き"],shadow:"傲慢さや自己中心的な態度が、せっかくの勝利を台無しにすることがある。",note:"19（1+9→1）は太陽の輝きと個人の勝利を象徴。謙虚さを保つほど、この数が持つ光は周囲を温め続ける。",master:false},
  20:{name:"The Unifer",msg:"人や意見をつなげることで、新しい可能性が生まれます。",essence:"目覚め・召命・統合",keywords:["判断","更新","変容","浄化"],shadow:"過去の後悔や罪悪感に引きずられ、前へ進む決断が遅れやすい。",note:"20（2+0=2）は審判と再生の数。過去を清算し、より大きな目的のために自分を捧げる覚悟が求められている。",master:false},
  21:{name:"The Completer",msg:"ひとつの流れが完成に近づいているため、最後まで丁寧に仕上げてください。",essence:"完成・統合・成就",keywords:["達成","円満","調和的完結","成就"],shadow:"完成への恐怖や完璧主義が最後の一歩を阻み、終われないループに入る。",note:"21（2+1=3）は完全統合の数。終わりは次の始まりであり、手放すことへの恐れを超えたとき真の完成が訪れる。",master:false},
  22:{name:"The Carisma",msg:"自分の存在感や影響力を意識し、それを前向きな方向に使ってください。",essence:"大いなる建設・夢の現実化",keywords:["ビジョン","実現力","スケール","影響力"],shadow:"重圧に押しつぶされるか、力を乱用して周囲との信頼を損なうリスクがある。",note:"22はマスターナンバー「マスタービルダー」。4の堅実さを基盤に、大きなビジョンを現実に構築する力を持つ。一歩一歩を着実に積み上げることで真の力が発揮される。",master:true},
  23:{name:"The Flowrider",msg:"状況を無理に変えようとせず、今の流れを上手に乗りこなしてください。",essence:"適応・流動・社交",keywords:["柔軟性","コミュニケーション","直感","親和性"],shadow:"流れに乗りすぎて自分の軸を失い、周囲に振り回されてしまう。",note:"23（2+3=5）は5の自由に社交性が加わった数。流されることと乗りこなすことの違いを常に意識することが成長の核心。",master:false},
  24:{name:"The Gracebearer",msg:"優しさと品位ある行動が、周囲の空気を整えていきます。",essence:"愛情・品位・美",keywords:["品位","思いやり","美意識","誠実"],shadow:"愛情の押し付けや過干渉が相手を苦しめ、関係を複雑にしてしまう。",note:"24（2+4=6）は6の愛と責任に実直さが深まった数。美しいものへの感受性と誠実な奉仕が重なるとき影響力が生まれる。",master:false},
  25:{name:"The Wayfarer",msg:"自分のペースで歩み続けることで、本当に進むべき道が見えてきます。",essence:"内省・分析・自己信頼",keywords:["探求","自己信頼","精神的成長","洞察"],shadow:"内向きな分析が過ぎると不安と疑念が積み重なり、行動が止まる。",note:"25（2+5=7）は7の探求心に感受性と変化が組み合わさった数。孤独な旅の中でこそ深い洞察が生まれる。",master:false},
  26:{name:"The Trailblazer",msg:"まだ誰も進んでいない道を恐れず切り開いてください。",essence:"先駆・野心・現実構築",keywords:["開拓","野心","実行力","影響"],shadow:"物質的成功への執着が強まると、倫理観と人間関係が犠牲になりやすい。",note:"26（2+6=8）は8の現実化力に責任感と協調性が重なる数。成功の動機が自己中心的になるほど積み上げたものが崩れやすくなる。",master:false},
  27:{name:"The Gatewalker",msg:"人生の節目に立っているため、新しい段階へ進む準備をしてください。",essence:"慈悲・智慧・移行",keywords:["聖なる移行","博愛","深い理解","変容"],shadow:"すべてを手放そうとする反動で、必要なものまで切り捨てることがある。",note:"27（2+7=9）は9の完成と7の深い洞察が加わった数。何かが終わろうとしているなら、それは次の扉が開く合図。",master:false},
  28:{name:"The Resonator",msg:"共鳴する人や環境を選ぶことで、運気の流れが整います。",essence:"調和・協力・共鳴",keywords:["共鳴","パートナーシップ","実現","調和"],shadow:"承認欲求と依存が混在し、自立と協力のバランスが崩れやすい。",note:"28（2+8→1）は協調と達成が組み合わさり一なるものへ回帰する数。誰と共鳴するかが運命の分岐点となる。",master:false},
  29:{name:"The Visionweaver",msg:"未来のビジョンを具体的に描くことで現実が動き始めます。",essence:"理想・霊感・使命",keywords:["ビジョン","インスピレーション","奉仕","理想"],shadow:"理想と現実の落差が大きいとき、失望とエネルギーの枯渇が起きやすい。",note:"29（2+9=11）は11のマスターナンバーの性質を内包。霊的な使命感と高いビジョンを持つが、現実の一歩を踏み出すことが実現の鍵。",master:false},
  30:{name:"The Creator",msg:"自分の想像力を信じ、形にすることを恐れないでください。",essence:"創造・表現・喜び",keywords:["芸術","インスピレーション","表現力","楽観"],shadow:"散漫さや先送りが積み重なり、才能が形にならないまま終わりやすい。",note:"30（3+0=3）は3の純粋な創造力がゼロの可能性と出会い増幅された数。表現することそのものが喜びであり、結果を恐れて表現を止めることが最大のリスク。",master:false},
  31:{name:"The Architect",msg:"長期的な視点で計画を立て、現実的に構築していきましょう。",essence:"実用的創造・設計・構築",keywords:["計画性","実現","堅実","長期視点"],shadow:"創造性を生かしきれず安全策に逃げると、平凡な結果しか生まれない。",note:"31（3+1=4）は4の建設力と3の創造性が組み合わさった数。アイデアを実際に一つ一つ積み上げることにこそ価値が生まれる。",master:false},
  32:{name:"The Collaborator",msg:"信頼できる仲間と力を合わせることで、成果が大きくなります。",essence:"協力・共創・調和",keywords:["チームワーク","共創","信頼","相互補完"],shadow:"依存や優柔不断さが増すと、グループのエネルギーを下げてしまう。",note:"32（3+2=5）は変化・協調・表現が重なった数。どんな仲間と場を共にするかが人生の質を大きく左右するターニングポイント。",master:false},
  33:{name:"The Awakened",msg:"高い視点から物事を見て、周囲の成長を助ける存在になってください。",essence:"愛の師・奉仕・覚醒",keywords:["無条件の愛","教導","癒し","高次の使命"],shadow:"自己犠牲の限界を超えて燃え尽き、周囲にも重荷を与えてしまうことがある。",note:"33はマスターナンバー「マスターティーチャー」。6の愛が倍化した高次の無条件の愛の数。自分自身が満たされているとき初めてこの使命が正しく機能する。",master:true},
};

// ══════════════════════════════════════════════════
// 四柱推命
// ══════════════════════════════════════════════════
const TG=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const DZ=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const EM={甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水'};
const EC={木:'c-wood',火:'c-fire',土:'c-earth',金:'c-metal',水:'c-water'};
const ZE={子:'水',丑:'土',寅:'木',卯:'木',辰:'土',巳:'火',午:'火',未:'土',申:'金',酉:'金',戌:'土',亥:'水'};
const STEM_POLARITY={甲:'yang',乙:'yin',丙:'yang',丁:'yin',戊:'yang',己:'yin',庚:'yang',辛:'yin',壬:'yang',癸:'yin'};
const GENERATES={木:'火',火:'土',土:'金',金:'水',水:'木'};
const GENERATED_BY={木:'水',火:'木',土:'火',金:'土',水:'金'};
const CONTROLS={木:'土',火:'金',土:'水',金:'木',水:'火'};
const CONTROLLED_BY={木:'金',火:'水',土:'木',金:'火',水:'土'};
const HIDDEN_STEMS={
  子:['癸'],丑:['己','癸','辛'],寅:['甲','丙','戊'],卯:['乙'],
  辰:['戊','乙','癸'],巳:['丙','庚','戊'],午:['丁','己'],未:['己','丁','乙'],
  申:['庚','壬','戊'],酉:['辛'],戌:['戊','辛','丁'],亥:['壬','甲'],
};
const HIDDEN_STEM_WEIGHTS=[0.7,0.2,0.1];
const SOLAR_TERM_FALLBACK_DATES={
  minorCold:'01-06',
  springCommences:'02-04',
  insectsWaken:'03-05',
  brightAndClear:'04-05',
  summerCommences:'05-05',
  cornOnEar:'06-06',
  moderateHeat:'07-07',
  autumnCommences:'08-07',
  whiteDew:'09-07',
  coldDew:'10-08',
  winterCommences:'11-07',
  heavySnow:'12-07',
};
const EL={木:'#4a8b4a',火:'#c03030',土:'#c0922b',金:'#8080c0',水:'#2b60a0'};
const EJ={木:'木',火:'火',土:'土',金:'金',水:'水'};
function mod(n,m){return((n%m)+m)%m;}

function toDateKey(y,m,d){
  return`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

function getSolarTermBoundaries(year){
  const key=String(year);
  const loaded=SOLAR_TERM_BOUNDARIES?.[key];
  if(loaded&&Object.keys(loaded).length) return loaded;
  return Object.fromEntries(Object.entries(SOLAR_TERM_FALLBACK_DATES).map(([term,md])=>[term,`${year}-${md}`]));
}

function getGanzhiYear(y,m,d){
  const dateKey=toDateKey(y,m,d);
  const yearTerms=getSolarTermBoundaries(y);
  const effectiveYear=dateKey>=yearTerms.springCommences?y:y-1;
  const idx=mod(effectiveYear-4,60);
  return{
    effectiveYear,
    kan:TG[idx%10],
    zhi:DZ[idx%12],
  };
}

function getSolarMonthOrder(y,m,d){
  const dateKey=toDateKey(y,m,d);
  const prevTerms=getSolarTermBoundaries(y-1);
  const yearTerms=getSolarTermBoundaries(y);
  const boundaries=[
    {date:prevTerms.heavySnow,order:10},
    {date:yearTerms.minorCold,order:11},
    {date:yearTerms.springCommences,order:0},
    {date:yearTerms.insectsWaken,order:1},
    {date:yearTerms.brightAndClear,order:2},
    {date:yearTerms.summerCommences,order:3},
    {date:yearTerms.cornOnEar,order:4},
    {date:yearTerms.moderateHeat,order:5},
    {date:yearTerms.autumnCommences,order:6},
    {date:yearTerms.whiteDew,order:7},
    {date:yearTerms.coldDew,order:8},
    {date:yearTerms.winterCommences,order:9},
    {date:yearTerms.heavySnow,order:10},
  ];
  let current=boundaries[0].order;
  for(const boundary of boundaries){
    if(dateKey>=boundary.date) current=boundary.order;
  }
  return current;
}

function getGanzhiMonth(yearStem,monthOrder){
  const yearStemIndex=TG.indexOf(yearStem);
  const monthStemStart=[2,4,6,8,0,2,4,6,8,0][yearStemIndex];
  const stemIndex=mod(monthStemStart+monthOrder,10);
  const branchIndex=mod(2+monthOrder,12);
  return{
    kan:TG[stemIndex],
    zhi:DZ[branchIndex],
    monthOrder,
  };
}

function getJulianDayNumber(y,m,d){
  let yy=y,mm=m;
  if(mm<=2){yy-=1;mm+=12;}
  const a=Math.floor(yy/100);
  const b=2-a+Math.floor(a/4);
  return Math.floor(365.25*(yy+4716))+Math.floor(30.6001*(mm+1))+d+b-1524;
}

function getGanzhiDay(y,m,d){
  const jdn=getJulianDayNumber(y,m,d);
  const idx=mod(jdn+49,60);
  return{
    kan:TG[idx%10],
    zhi:DZ[idx%12],
    jdn,
  };
}

function getGanzhiHour(dayStem,hour){
  const normalizedHour=Number.isFinite(hour)?hour:12;
  const branchIndex=Math.floor((mod(normalizedHour,24)+1)/2)%12;
  const dayStemIndex=TG.indexOf(dayStem);
  const stemStart=[0,2,4,6,8,0,2,4,6,8][dayStemIndex];
  const stemIndex=mod(stemStart+branchIndex,10);
  return{
    kan:TG[stemIndex],
    zhi:DZ[branchIndex],
    branchIndex,
  };
}

function getTenGod(dayStem,targetStem){
  if(!dayStem||!targetStem) return '';
  if(dayStem===targetStem) return '日主';
  const dmElem=EM[dayStem];
  const targetElem=EM[targetStem];
  const samePolarity=STEM_POLARITY[dayStem]===STEM_POLARITY[targetStem];
  if(dmElem===targetElem) return samePolarity?'比肩':'劫財';
  if(GENERATES[dmElem]===targetElem) return samePolarity?'食神':'傷官';
  if(GENERATED_BY[dmElem]===targetElem) return samePolarity?'偏印':'正印';
  if(CONTROLS[dmElem]===targetElem) return samePolarity?'偏財':'正財';
  if(CONTROLLED_BY[dmElem]===targetElem) return samePolarity?'七殺':'正官';
  return '';
}

function getPillarDetail(label,kan,zhi,dayStem){
  const hidden=(HIDDEN_STEMS[zhi]||[]).map((stem,index)=>({
    stem,
    element:EM[stem],
    tenGod:getTenGod(dayStem,stem),
    weight:HIDDEN_STEM_WEIGHTS[index]||0.1,
  }));
  return{
    label,
    kan,
    zhi,
    stemElement:EM[kan],
    branchElement:ZE[zhi],
    tenGod:label==='日柱'?'日主':getTenGod(dayStem,kan),
    hidden,
  };
}

function scoreMeimeiStrength(dayElement,monthBranch,pillars){
  const sameElem=dayElement;
  const resourceElem=GENERATED_BY[dayElement];
  const outputElem=GENERATES[dayElement];
  const wealthElem=CONTROLS[dayElement];
  const officerElem=CONTROLLED_BY[dayElement];
  const weighted={木:0,火:0,土:0,金:0,水:0};
  pillars.forEach(pillar=>{
    weighted[pillar.stemElement]+=1;
    pillar.hidden.forEach(item=>{weighted[item.element]+=item.weight;});
  });
  const monthMain=(HIDDEN_STEMS[monthBranch]||[ZE[monthBranch]])[0];
  const monthElem=EM[monthMain]||ZE[monthBranch];
  let score=0;
  if(monthElem===sameElem) score+=2.4;
  else if(monthElem===resourceElem) score+=1.8;
  else if(monthElem===outputElem) score-=0.8;
  else if(monthElem===wealthElem) score-=1.3;
  else if(monthElem===officerElem) score-=1.6;

  score+=weighted[sameElem]*0.85;
  score+=weighted[resourceElem]*0.65;
  score-=weighted[outputElem]*0.35;
  score-=weighted[wealthElem]*0.55;
  score-=weighted[officerElem]*0.65;

  let strengthLabel='中和';
  if(score>=4.8) strengthLabel='身強';
  else if(score>=3.1) strengthLabel='やや身強';
  else if(score<=-1.6) strengthLabel='身弱';
  else if(score<=0.6) strengthLabel='やや身弱';

  const favorable=strengthLabel.includes('身強')
    ?[outputElem,wealthElem,officerElem]
    :[sameElem,resourceElem,outputElem];

  return{
    score:Number(score.toFixed(2)),
    weighted,
    strengthLabel,
    monthElement:monthElem,
    favorableElements:[...new Set(favorable)].slice(0,3),
    sameElem,
    resourceElem,
    outputElem,
    wealthElem,
    officerElem,
  };
}

function calcMeimei(y,m,d,h){
  if(!Number.isFinite(d)) return calcMeimeiPartial(y,m,GENDER);
  const birthHour=Number.isFinite(h)?h:null;
  const yearPillar=getGanzhiYear(y,m,d);
  const monthOrder=getSolarMonthOrder(y,m,d);
  const monthPillar=getGanzhiMonth(yearPillar.kan,monthOrder);
  const dayPillar=getGanzhiDay(y,m,d);
  const hourPillar=getGanzhiHour(dayPillar.kan,birthHour);

  const dm=dayPillar.kan;
  const elem=EM[dm];
  const pillars=[
    getPillarDetail('年柱',yearPillar.kan,yearPillar.zhi,dm),
    getPillarDetail('月柱',monthPillar.kan,monthPillar.zhi,dm),
    getPillarDetail('日柱',dayPillar.kan,dayPillar.zhi,dm),
    getPillarDetail('時柱',hourPillar.kan,hourPillar.zhi,dm),
  ];
  const strength=scoreMeimeiStrength(elem,monthPillar.zhi,pillars);
  const cnt=strength.weighted;
  return attachAdvancedMeimeiData({
    mode:'full',
    precision:'full-date',
    pillars,dm,elem,
    cnt,
    total:Number(Object.values(cnt).reduce((a,b)=>a+b,0).toFixed(2)),
    birthHour,
    useApproxSolarTerms:!SOLAR_TERM_DATA_READY,
    seasonBranch:monthPillar.zhi,
    seasonElement:strength.monthElement,
    strengthLabel:strength.strengthLabel,
    strengthScore:strength.score,
    favorableElements:strength.favorableElements,
    resourceElement:strength.resourceElem,
    outputElement:strength.outputElem,
    wealthElement:strength.wealthElem,
    officerElement:strength.officerElem,
  },{
    year:y,month:m,day:d,hour:birthHour,
  },GENDER);
}
function calcLp(y,m,d){
  const s=String(y)+String(m).padStart(2,'0')+String(d).padStart(2,'0');
  let n=s.split('').reduce((a,c)=>a+parseInt(c),0);
  while(n>9&&n!==11&&n!==22&&n!==33){n=String(n).split('').reduce((a,c)=>a+parseInt(c),0);}
  return n;
}

const STEM_ARCHETYPES={
  甲:'まっすぐ伸びる大木のように、軸を決めるほど強いタイプです',
  乙:'しなやかな草花のように、空気を読みながら育てていくタイプです',
  丙:'太陽のように熱量を外へ出すほど存在感が増すタイプです',
  丁:'灯火のように繊細ですが、狙いを定めると深く照らすタイプです',
  戊:'山のようにどっしり構え、土台づくりで力を発揮するタイプです',
  己:'畑の土のように、手を入れた分だけ現実を整えるタイプです',
  庚:'鉱石や刃のように、判断と決断で局面を切り替えるタイプです',
  辛:'宝石のように、精度や美意識を磨くほど評価が上がるタイプです',
  壬:'大河のように、スケールの大きさと流れを読む力を持つタイプです',
  癸:'雨露のように、感受性と観察で細部を整えるタイプです',
};
const MONTH_BRANCH_COPY={
  寅:'立ち上がりと挑戦の気が強く、新しい流れに乗るほど運が開きやすい時期性です。',
  卯:'人との縁や感性が伸びやすく、対話や共感から道が開きやすい時期性です。',
  辰:'変化の継ぎ目を整える力が強く、曖昧なものを形にするほど安定しやすい時期性です。',
  巳:'熱量と判断のスピードが上がりやすく、決断を引き延ばしすぎない方が流れに乗りやすい時期性です。',
  午:'表現力と押し出しが強まりやすく、前に出るほど手応えを取りやすい時期性です。',
  未:'人や状況を抱え込みやすいぶん、整理役として信頼を集めやすい時期性です。',
  申:'現実感覚と収穫意識が強く、成果や効率を意識するほど力が出やすい時期性です。',
  酉:'仕上げと選別の精度が上がりやすく、基準を明確にするほど迷いが減る時期性です。',
  戌:'責任や役割の重みを引き受けやすく、長期視点で整えるほど強さが生きる時期性です。',
  亥:'発想や学びが深まりやすく、ひとりで考える時間が質を上げる時期性です。',
  子:'情報感度と反応速度が高まりやすく、変化を読む力が前に出やすい時期性です。',
  丑:'蓄積と持久力が問われやすく、小さな積み上げがあとで効いてくる時期性です。',
};
const TEN_GOD_SHORT={
  比肩:'自力で切り開く力',
  劫財:'人を巻き込む突破力',
  食神:'穏やかな表現力',
  傷官:'鋭い観察眼',
  偏印:'独自の発想',
  正印:'学びと吸収力',
  偏財:'機動的な対人力',
  正財:'堅実な管理力',
  七殺:'勝負勘と負荷耐性',
  正官:'責任感と信頼',
};
const NAME_ELEMENT_COPY={
  木:'立ち上がりと成長',
  火:'表現と発信',
  土:'安定と信頼',
  金:'判断と整理',
  水:'知性と柔軟性',
};
const NAME_ELEMENT_DETAIL={
  木:'新しい流れを作る役で力が出やすい',
  火:'人前で気持ちや考えを外へ出すほど輝きやすい',
  土:'面倒見と継続で評価を積み上げやすい',
  金:'線引きや選別をはっきりさせるほど冴えやすい',
  水:'観察と対話を挟むほど判断の精度が上がりやすい',
};
const COMMON_SURNAMES=[
  '佐藤','鈴木','高橋','田中','伊藤','渡辺','山本','中村','小林','加藤','吉田','山田','佐々木','山口','松本','井上',
  '木村','林','斎藤','清水','山崎','森','阿部','池田','橋本','山下','石川','中島','前田','藤田','小川','後藤',
  '岡田','長谷川','村上','近藤','石井','坂本','遠藤','青木','藤井','西村','福田','太田','三浦','岡本','松田','中川',
  '中野','原田','小野','田村','竹内','金子','和田','中山','藤原','石田','上田','森田','原','酒井','工藤','横山',
  '柴田','宮崎','宮本','大野','増田','小島','今井','高木','村田','安藤','内田','松尾','丸山','杉山','藤本','河野',
  '富田','岡崎','宮田','平野','久保','沢田','黒田','堀','尾崎','望月','荒木','大西','菅原','片山','久保田','東海林',
  '三宅','上野','西田','中田','飯田','吉川','本田','菊地','松井','福島','辻','桜井','谷口','大塚','新井','浜田',
  '濱田','古川','内藤','奥村','野口','松岡','菊池','北村','杉本','土屋','佐野','宇野','熊谷','柴崎','岩崎','大谷',
  '川口','野村','関','平田','吉岡','安田','本間','山中','川上','川崎','岩田','西川','服部','樋口','秋山','浅野'
];
const BRANCH_COMBINATIONS={子:'丑',丑:'子',寅:'亥',卯:'戌',辰:'酉',巳:'申',午:'未',未:'午',申:'巳',酉:'辰',戌:'卯',亥:'寅'};
const BRANCH_CLASHES={子:'午',丑:'未',寅:'申',卯:'酉',辰:'戌',巳:'亥',午:'子',未:'丑',申:'寅',酉:'卯',戌:'辰',亥:'巳'};
const BRANCH_HARMS={子:'未',丑:'午',寅:'巳',卯:'辰',辰:'卯',巳:'寅',午:'丑',未:'子',申:'亥',酉:'戌',戌:'酉',亥:'申'};
const BRANCH_RELATION_LABELS={same:'同支',combine:'六合',clash:'冲',harm:'害'};
const BRANCH_RELATION_COPY={
  same:'同じテーマが繰り返し表面化しやすく、無視していた課題が再確認されやすい関係です。',
  combine:'縁・協力・結び直しが起こりやすく、誰と組むかで結果が変わりやすい関係です。',
  clash:'環境の揺さぶりや方向転換が起こりやすく、やり方の更新を求められやすい関係です。',
  harm:'見えにくい負荷や気疲れが出やすく、距離感と線引きが大事になりやすい関係です。',
};
const FORTUNE_BOUNDARY_LABELS={
  minorCold:'小寒',
  springCommences:'立春',
  insectsWaken:'啓蟄',
  brightAndClear:'清明',
  summerCommences:'立夏',
  cornOnEar:'芒種',
  moderateHeat:'小暑',
  autumnCommences:'立秋',
  whiteDew:'白露',
  coldDew:'寒露',
  winterCommences:'立冬',
  heavySnow:'大雪',
};
const FORTUNE_TEN_GOD_COPY={
  比肩:'自分の意思で舵を切る場面が増えやすい運気です。',
  劫財:'競争と協働が同時に動きやすく、人との関わり方が結果を左右しやすい運気です。',
  食神:'余白・表現・楽しさを回復させやすく、息の長い流れを作りやすい運気です。',
  傷官:'違和感への感度が高まりやすく、精度の高い見直しが成果につながりやすい運気です。',
  偏印:'学び直しや独自路線への切り替えが起こりやすい運気です。',
  正印:'守りを固めながら吸収力を高めやすく、基礎を整えるほど安定しやすい運気です。',
  偏財:'人脈・商機・外との接点が増えやすく、動くほど縁が広がりやすい運気です。',
  正財:'管理・現実面の立て直しが進みやすく、堅実さが強みに変わりやすい運気です。',
  七殺:'負荷が上がるぶん、勝負勘と突破力が鍛えられやすい運気です。',
  正官:'責任や役割が明確になり、信頼を積みやすい運気です。',
};

function getEmptyElementCounter(){
  return{木:0,火:0,土:0,金:0,水:0};
}

function addElementWeight(counter,element,weight=1){
  if(!element) return;
  counter[element]=Number(((counter[element]||0)+weight).toFixed(2));
}

function getRankedEntries(counter,limit=5){
  return Object.entries(counter||{})
    .map(([key,value])=>({key,value:Number(value||0)}))
    .sort((a,b)=>b.value-a.value||String(a.key).localeCompare(String(b.key),'ja'))
    .slice(0,limit);
}

function formatElementRanking(counter,limit=2){
  return getRankedEntries(counter,limit)
    .filter(item=>item.value>0)
    .map(item=>`${item.key}(${item.value.toFixed(1)})`)
    .join('・');
}

function getWeakElements(counter,limit=2){
  return getRankedEntries(counter,5)
    .slice()
    .reverse()
    .slice(0,limit)
    .map(item=>item.key);
}

function accumulatePillarElements(counter,pillar,weight=1){
  if(!pillar) return;
  addElementWeight(counter,pillar.stemElement,1*weight);
  (pillar.hidden||[]).forEach(item=>addElementWeight(counter,item.element,(item.weight||0.1)*weight));
}

function countTenGodsFromPillars(pillars){
  const counts={};
  (pillars||[]).forEach(pillar=>{
    if(pillar.tenGod&&pillar.tenGod!=='日主') counts[pillar.tenGod]=(counts[pillar.tenGod]||0)+1;
    (pillar.hidden||[]).forEach(item=>{
      if(item.tenGod&&item.tenGod!=='日主') counts[item.tenGod]=(counts[item.tenGod]||0)+(item.weight||0.1);
    });
  });
  return Object.entries(counts)
    .map(([key,value])=>({key,value:Number(value.toFixed(2))}))
    .sort((a,b)=>b.value-a.value||a.key.localeCompare(b.key,'ja'));
}

function formatCandidateDays(days){
  if(!days||!days.length) return '';
  if(days.length===1) return `${days[0]}日`;
  return `${days[0]}日〜${days[days.length-1]}日`;
}

function incrementPillarCandidate(store,pillar,day){
  const key=`${pillar.kan}${pillar.zhi}`;
  if(!store[key]) store[key]={key,kan:pillar.kan,zhi:pillar.zhi,count:0,days:[]};
  store[key].count+=1;
  store[key].days.push(day);
}

function getCandidateList(store){
  return Object.values(store||{})
    .sort((a,b)=>b.count-a.count||a.key.localeCompare(b.key,'ja'));
}

function getGanzhiIndex(kan,zhi){
  for(let i=0;i<60;i++){
    if(TG[i%10]===kan&&DZ[i%12]===zhi) return i;
  }
  return 0;
}

function shiftGanzhiPillar(pillar,step=0){
  if(!pillar?.kan||!pillar?.zhi) return null;
  const idx=getGanzhiIndex(pillar.kan,pillar.zhi);
  const nextIdx=mod(idx+step,60);
  return{
    kan:TG[nextIdx%10],
    zhi:DZ[nextIdx%12],
    key:`${TG[nextIdx%10]}${DZ[nextIdx%12]}`,
  };
}

function toJsDate(y,m,d){
  return new Date(Number(y),Number(m)-1,Number(d),12,0,0,0);
}

function diffDaysBetween(dateA,dateB){
  return Math.round((dateA.getTime()-dateB.getTime())/86400000);
}

function formatAgeValue(value){
  const num=Number(value||0);
  return Number.isInteger(num)?String(num):num.toFixed(1);
}

function calcAgeDecimal(y,m,d,refDate=new Date()){
  const birth=toJsDate(y,m,d);
  const current=new Date(refDate.getFullYear(),refDate.getMonth(),refDate.getDate(),12,0,0,0);
  return Number(((current.getTime()-birth.getTime())/31556952000).toFixed(1));
}

function getFortuneBoundaryList(year){
  const prev=getSolarTermBoundaries(year-1);
  const current=getSolarTermBoundaries(year);
  const next=getSolarTermBoundaries(year+1);
  return[
    {key:'heavySnow',label:FORTUNE_BOUNDARY_LABELS.heavySnow,date:prev.heavySnow},
    {key:'minorCold',label:FORTUNE_BOUNDARY_LABELS.minorCold,date:current.minorCold},
    {key:'springCommences',label:FORTUNE_BOUNDARY_LABELS.springCommences,date:current.springCommences},
    {key:'insectsWaken',label:FORTUNE_BOUNDARY_LABELS.insectsWaken,date:current.insectsWaken},
    {key:'brightAndClear',label:FORTUNE_BOUNDARY_LABELS.brightAndClear,date:current.brightAndClear},
    {key:'summerCommences',label:FORTUNE_BOUNDARY_LABELS.summerCommences,date:current.summerCommences},
    {key:'cornOnEar',label:FORTUNE_BOUNDARY_LABELS.cornOnEar,date:current.cornOnEar},
    {key:'moderateHeat',label:FORTUNE_BOUNDARY_LABELS.moderateHeat,date:current.moderateHeat},
    {key:'autumnCommences',label:FORTUNE_BOUNDARY_LABELS.autumnCommences,date:current.autumnCommences},
    {key:'whiteDew',label:FORTUNE_BOUNDARY_LABELS.whiteDew,date:current.whiteDew},
    {key:'coldDew',label:FORTUNE_BOUNDARY_LABELS.coldDew,date:current.coldDew},
    {key:'winterCommences',label:FORTUNE_BOUNDARY_LABELS.winterCommences,date:current.winterCommences},
    {key:'heavySnow',label:FORTUNE_BOUNDARY_LABELS.heavySnow,date:current.heavySnow},
    {key:'minorCold',label:FORTUNE_BOUNDARY_LABELS.minorCold,date:next.minorCold},
    {key:'springCommences',label:FORTUNE_BOUNDARY_LABELS.springCommences,date:next.springCommences},
  ].filter(item=>item.date);
}

function findFortuneBoundary(y,m,d,direction){
  const birthKey=toDateKey(y,m,d);
  const boundaries=getFortuneBoundaryList(y);
  if(direction>=0){
    return boundaries.find(item=>item.date>=birthKey)||boundaries[boundaries.length-1]||null;
  }
  const reversed=[...boundaries].reverse();
  return reversed.find(item=>item.date<=birthKey)||reversed[0]||null;
}

function getFortuneDirection(yearStem,gender){
  const isYang=STEM_POLARITY[yearStem]==='yang';
  if(gender==='male'){
    return{
      step:isYang?1:-1,
      label:isYang?'順行':'逆行',
      note:'男性 × 年干の陰陽で起運方向を判定しています。',
    };
  }
  if(gender==='female'){
    return{
      step:isYang?-1:1,
      label:isYang?'逆行':'順行',
      note:'女性 × 年干の陰陽で起運方向を判定しています。',
    };
  }
  return{
    step:1,
    label:'参考順行',
    note:'性別選択が「その他」のため、大運は参考値として順行で表示しています。',
  };
}

function getBranchRelationType(leftBranch,rightBranch){
  if(!leftBranch||!rightBranch) return '';
  if(leftBranch===rightBranch) return 'same';
  if(BRANCH_COMBINATIONS[leftBranch]===rightBranch) return 'combine';
  if(BRANCH_CLASHES[leftBranch]===rightBranch) return 'clash';
  if(BRANCH_HARMS[leftBranch]===rightBranch) return 'harm';
  return '';
}

function getBranchRelationList(targetBranch,pillars){
  const typeRank={clash:4,combine:3,harm:2,same:1};
  const labelRank={日柱:4,月柱:3,年柱:2,時柱:1};
  return(pillars||[])
    .map(pillar=>{
      const type=getBranchRelationType(targetBranch,pillar?.zhi);
      if(!type) return null;
      return{
        type,
        label:BRANCH_RELATION_LABELS[type],
        against:pillar.label,
        branch:pillar.zhi,
        summary:`${pillar.label}（${pillar.zhi}）と${BRANCH_RELATION_LABELS[type]}。${BRANCH_RELATION_COPY[type]}`,
        priority:(typeRank[type]||0)*10+(labelRank[pillar.label]||0),
      };
    })
    .filter(Boolean)
    .sort((a,b)=>b.priority-a.priority);
}

function summarizeBranchRelations(relations,limit=2){
  return(relations||[])
    .slice(0,limit)
    .map(item=>`${item.against}${item.label}`)
    .join(' / ');
}

function describeTransitCopy(tenGod,relations){
  const base=FORTUNE_TEN_GOD_COPY[tenGod]||'役割や向き合い方の切り替えが起こりやすい運気です。';
  const lead=relations?.[0];
  if(!lead) return base;
  return `${base} とくに${lead.against}との${lead.label}があり、${BRANCH_RELATION_COPY[lead.type]}`;
}

function analyzeNatalBranchDynamics(pillars){
  const typeRank={clash:4,combine:3,harm:2,same:1};
  const relations=[];
  for(let i=0;i<(pillars||[]).length;i++){
    for(let j=i+1;j<(pillars||[]).length;j++){
      const left=pillars[i];
      const right=pillars[j];
      const type=getBranchRelationType(left?.zhi,right?.zhi);
      if(!type) continue;
      relations.push({
        type,
        label:BRANCH_RELATION_LABELS[type],
        left:left.label,
        right:right.label,
        pair:`${left.label}×${right.label}`,
        summary:`${left.label}（${left.zhi}）と${right.label}（${right.zhi}）が${BRANCH_RELATION_LABELS[type]}で、${BRANCH_RELATION_COPY[type]}`,
        priority:typeRank[type]||0,
      });
    }
  }
  relations.sort((a,b)=>b.priority-a.priority||a.pair.localeCompare(b.pair,'ja'));
  return{
    relations,
    summary:relations[0]?.summary||'地支同士の大きな衝突が少なく、状況に応じて役割を運びやすい命式です。',
  };
}

function buildDaiunSummary(meimei,birth,gender){
  if(!meimei?.dm||!Number.isFinite(birth?.day)) return null;
  const direction=getFortuneDirection(meimei.pillars?.[0]?.kan||'',gender);
  const boundary=findFortuneBoundary(birth.year,birth.month,birth.day,direction.step);
  if(!boundary) return null;
  const birthDate=toJsDate(birth.year,birth.month,birth.day);
  const boundaryParts=String(boundary.date).split('-').map(Number);
  const boundaryDate=toJsDate(boundaryParts[0],boundaryParts[1],boundaryParts[2]);
  const diffDays=Math.max(0,Math.abs(diffDaysBetween(boundaryDate,birthDate)));
  const startAge=Number((diffDays/3).toFixed(1));
  const monthPillar=meimei.pillars?.find(p=>p.label==='月柱')||meimei.pillars?.[1];
  const currentAge=calcAgeDecimal(birth.year,birth.month,birth.day,new Date());
  const cycles=Array.from({length:8},(_,index)=>{
    const shifted=shiftGanzhiPillar(monthPillar,direction.step*(index+1));
    const ageStart=Number((startAge+index*10).toFixed(1));
    const ageEnd=Number((startAge+(index+1)*10).toFixed(1));
    const tenGod=getTenGod(meimei.dm,shifted.kan);
    const relations=getBranchRelationList(shifted.zhi,meimei.pillars);
    return{
      index:index+1,
      kan:shifted.kan,
      zhi:shifted.zhi,
      pillar:`${shifted.kan}${shifted.zhi}`,
      ageStart,
      ageEnd,
      ageLabel:`${formatAgeValue(ageStart)}〜${formatAgeValue(ageEnd)}歳`,
      tenGod,
      relations,
      relationText:summarizeBranchRelations(relations),
      copy:describeTransitCopy(tenGod,relations),
      isCurrent:currentAge>=ageStart&&currentAge<ageEnd,
    };
  });
  const currentCycle=cycles.find(item=>item.isCurrent)||null;
  const nextCycle=currentCycle?cycles[cycles.indexOf(currentCycle)+1]||null:cycles[0]||null;
  return{
    directionLabel:direction.label,
    directionNote:direction.note,
    startAge,
    startText:`${formatAgeValue(startAge)}歳ごろ`,
    currentAge,
    boundaryLabel:boundary.label,
    boundaryDate:boundary.date,
    boundaryText:`${direction.step>0?'次の':'直前の'}節入り「${boundary.label}」（${boundary.date}）までを起運計算の基準にしています。`,
    cycles,
    currentCycle,
    nextCycle,
  };
}

function buildAnnualFortunes(meimei,centerYear=new Date().getFullYear()){
  if(!meimei?.dm) return[];
  return Array.from({length:6},(_,index)=>{
    const year=centerYear-1+index;
    const yearPillar=getGanzhiYear(year,7,1);
    const tenGod=getTenGod(meimei.dm,yearPillar.kan);
    const relations=getBranchRelationList(yearPillar.zhi,meimei.pillars);
    return{
      year,
      kan:yearPillar.kan,
      zhi:yearPillar.zhi,
      pillar:`${yearPillar.kan}${yearPillar.zhi}`,
      tenGod,
      relations,
      relationText:summarizeBranchRelations(relations),
      copy:describeTransitCopy(tenGod,relations),
      isCurrent:year===centerYear,
    };
  });
}

function attachAdvancedMeimeiData(meimei,birth,gender=GENDER){
  if(!meimei) return meimei;
  meimei.branchDynamics=analyzeNatalBranchDynamics(meimei.pillars||[]);
  if(meimei.mode==='full'&&Number.isFinite(birth?.day)){
    meimei.fortune=buildDaiunSummary(meimei,birth,gender);
    if(meimei.fortune) meimei.fortune.annual=buildAnnualFortunes(meimei);
  }else{
    meimei.fortune=null;
  }
  return meimei;
}

function guessNameSplitByLength(compact,splitPoint){
  const chars=Array.from(compact||'');
  if(chars.length<2) return null;
  const point=Number.isInteger(splitPoint)
    ?splitPoint
    :(chars.length===2?1:(chars.length===3?1:2));
  if(point<=0||point>=chars.length) return null;
  return{sei:chars.slice(0,point).join(''),mei:chars.slice(point).join('')};
}

function scoreNameSplitCandidate(sei,mei,source){
  const seiLen=Array.from(sei||'').length;
  const meiLen=Array.from(mei||'').length;
  let score=0;
  if(COMMON_SURNAMES.includes(sei)) score+=40;
  if(source==='dictionary') score+=24;
  else if(source==='heuristic') score+=8;
  if(seiLen===2) score+=8;
  else if(seiLen===1||seiLen===3) score+=4;
  if(meiLen===2) score+=8;
  else if(meiLen===1||meiLen===3) score+=4;
  if(/[々]/u.test(sei)) score+=2;
  if(/[子美花香菜奈乃音]/u.test(Array.from(mei).slice(-1)[0]||'')) score+=2;
  return score;
}

function buildNameSplitCandidates(compact){
  const chars=Array.from(compact||'');
  if(chars.length<2) return[];
  const candidates=[];
  const seen=new Set();
  const pushCandidate=(sei,mei,source)=>{
    if(!sei||!mei) return;
    const key=`${sei}|${mei}`;
    if(seen.has(key)) return;
    seen.add(key);
    candidates.push({
      sei,mei,source,
      score:scoreNameSplitCandidate(sei,mei,source),
    });
  };
  COMMON_SURNAMES
    .filter(surname=>compact.startsWith(surname)&&chars.length>Array.from(surname).length)
    .sort((a,b)=>b.length-a.length)
    .forEach(surname=>pushCandidate(surname,compact.slice(surname.length),'dictionary'));
  const maxPoint=Math.min(3,chars.length-1);
  for(let point=1;point<=maxPoint;point++){
    const guessed=guessNameSplitByLength(compact,point);
    if(guessed) pushCandidate(guessed.sei,guessed.mei,'heuristic');
  }
  return candidates.sort((a,b)=>b.score-a.score||b.sei.length-a.sei.length||a.sei.localeCompare(b.sei,'ja'));
}

function splitJapaneseFullname(fullname){
  const raw=String(fullname||'').trim().replace(/\u3000/g,' ');
  if(!raw) return null;
  const spaced=raw.split(/\s+/).filter(Boolean);
  if(spaced.length>=2){
    return{
      sei:spaced[0],
      mei:spaced.slice(1).join(''),
      source:'space',
      confidence:'high',
      original:raw,
      alternatives:[],
    };
  }
  const compact=raw.replace(/\s+/g,'');
  if(Array.from(compact).length<2) return null;
  const candidates=buildNameSplitCandidates(compact);
  if(!candidates.length) return null;
  const [best,...rest]=candidates;
  const gap=(best?.score||0)-(rest[0]?.score||0);
  const confidence=best.source==='dictionary'
    ?(gap>=10?'high':'medium')
    :(gap>=8?'medium':'low');
  return{
    sei:best.sei,
    mei:best.mei,
    source:best.source,
    confidence,
    original:raw,
    alternatives:rest.slice(0,2).map(item=>({sei:item.sei,mei:item.mei,source:item.source})),
  };
}

function getNameElement(num){
  const last=mod(Number(num)||0,10);
  if(last===1||last===2) return '木';
  if(last===3||last===4) return '火';
  if(last===5||last===6) return '土';
  if(last===7||last===8) return '金';
  return '水';
}

function getElementFlow(from,to){
  if(from===to) return{type:'same',label:'同気'};
  if(GENERATES[from]===to) return{type:'generate',label:'相生'};
  if(GENERATED_BY[from]===to) return{type:'receive',label:'受生'};
  if(CONTROLS[from]===to) return{type:'control',label:'相剋'};
  if(CONTROLLED_BY[from]===to) return{type:'controlled',label:'被剋'};
  return{type:'neutral',label:'中立'};
}

function getLuckTone(label){
  if(label==='大吉') return'勢いが乗りやすく、結果につながりやすい';
  if(label==='吉') return'着実に育てやすく、信用へ変わりやすい';
  if(label==='注意'||label==='平') return'使い方次第で強みにも課題にも振れやすい';
  if(label==='小凶') return'感情や判断の波が出やすい';
  if(label==='中凶') return'無理を重ねると歪みが出やすい';
  return'早めに整えるほど安定しやすい';
}

function evaluateThreeTalents(nameJudge){
  const tenElem=getNameElement(nameJudge?.kakus?.[0]?.num);
  const jinElem=getNameElement(nameJudge?.kakus?.[1]?.num);
  const chiElem=getNameElement(nameJudge?.kakus?.[2]?.num);
  const flow1=getElementFlow(tenElem,jinElem);
  const flow2=getElementFlow(jinElem,chiElem);
  const scoreMap={generate:2,same:1.2,receive:0.5,neutral:0,controlled:-1,control:-2};
  const score=(scoreMap[flow1.type]||0)+(scoreMap[flow2.type]||0);
  let label='調整型';
  let summary='強みはありますが、出し方を整えるほど結果の質が上がる配置です。';
  if(score>=3){
    label='吉配';
    summary='土台から行動まで流れが通りやすく、努力が形になりやすい配置です。';
  }else if(score>=1){
    label='安定型';
    summary='極端な衝突が少なく、積み上げを継続すると強みが育ちやすい配置です。';
  }else if(score<=-2){
    label='葛藤型';
    summary='内面と現実の噛み合わせに負荷が出やすく、環境選びが重要になる配置です。';
  }
  return{
    pattern:`${tenElem}-${jinElem}-${chiElem}`,
    label,
    summary,
    score:Number(score.toFixed(1)),
    flows:[flow1,flow2],
    elements:{ten:tenElem,jin:jinElem,chi:chiElem},
  };
}

function evaluateYinYangBalance(nameJudge){
  const chars=[...(nameJudge?.seiChars||[]),...(nameJudge?.meiChars||[])];
  let odd=0,even=0;
  chars.forEach(entry=>((entry.count||0)%2===0?even++:odd++));
  let label='均衡型';
  let summary='押し出しと受け止めの切り替えがしやすく、場に応じて表情を変えやすい配列です。';
  if(odd-even>=2){
    label='陽優勢';
    summary='自分から動く力が強く、主導権を握るほど本来の力が出やすい配列です。';
  }else if(even-odd>=2){
    label='陰優勢';
    summary='受け止めて整える力が強く、状況を観察してから動くほど精度が上がる配列です。';
  }
  return{odd,even,label,summary};
}

function calcMeimeiPartial(y,m,gender=GENDER){
  const yearCandidatesMap={};
  const monthCandidatesMap={};
  const cnt=getEmptyElementCounter();
  const maxDay=new Date(y,m,0).getDate();
  for(let day=1;day<=maxDay;day++){
    const yearPillar=getGanzhiYear(y,m,day);
    const monthOrder=getSolarMonthOrder(y,m,day);
    const monthPillar=getGanzhiMonth(yearPillar.kan,monthOrder);
    incrementPillarCandidate(yearCandidatesMap,yearPillar,day);
    incrementPillarCandidate(monthCandidatesMap,monthPillar,day);
    accumulatePillarElements(cnt,getPillarDetail('年柱',yearPillar.kan,yearPillar.zhi,''),0.9);
    accumulatePillarElements(cnt,getPillarDetail('月柱',monthPillar.kan,monthPillar.zhi,''),1.15);
  }
  const yearCandidates=getCandidateList(yearCandidatesMap);
  const monthCandidates=getCandidateList(monthCandidatesMap);
  const yearMain=yearCandidates[0];
  const monthMain=monthCandidates[0];
  const seasonBranch=monthMain?.zhi||'';
  const seasonStem=(HIDDEN_STEMS[seasonBranch]||[ZE[seasonBranch]])[0];
  return attachAdvancedMeimeiData({
    mode:'partial',
    precision:'year-month',
    pillars:[
      getPillarDetail('年柱',yearMain.kan,yearMain.zhi,''),
      getPillarDetail('月柱',monthMain.kan,monthMain.zhi,''),
    ],
    dm:null,
    elem:null,
    cnt,
    total:Number(Object.values(cnt).reduce((a,b)=>a+b,0).toFixed(2)),
    birthHour:null,
    useApproxSolarTerms:!SOLAR_TERM_DATA_READY,
    seasonBranch,
    seasonElement:EM[seasonStem]||ZE[seasonBranch],
    strengthLabel:'年月ベース',
    strengthScore:null,
    favorableElements:getWeakElements(cnt,3),
    resourceElement:null,
    outputElement:null,
    wealthElement:null,
    officerElement:null,
    yearCandidates,
    monthCandidates,
  },{
    year:y,month:m,day:null,hour:null,
  },gender);
}

function buildMeimeiInsights(meimei){
  if(!meimei) return null;
  const dominantElements=formatElementRanking(meimei.cnt,2)||'土';
  const weakElements=getWeakElements(meimei.cnt,2).join('・');
  const seasonCopy=MONTH_BRANCH_COPY[meimei.seasonBranch]||'季節の気質が色濃く出やすい配置です。';
  if(meimei.mode==='partial'){
    const yearLead=meimei.yearCandidates?.[0];
    const monthLead=meimei.monthCandidates?.[0];
    return{
      core:`日が未入力のため年柱・月柱中心の読みですが、${yearLead?.kan||''}${yearLead?.zhi||''}と${monthLead?.kan||''}${monthLead?.zhi||''}が表に出やすい骨格です。${seasonCopy}`,
      timing:meimei.monthCandidates?.length>1
        ?`この月は節入りをまたぐため、月柱が ${meimei.monthCandidates.map(item=>`${item.kan}${item.zhi}`).join(' / ')} に分かれる可能性があります。月初か月末かで出方が少し変わります。`
        :`この月は月柱が安定しており、${monthLead?.kan||''}${monthLead?.zhi||''}の気質が比較的まっすぐ出やすい月です。`,
      advice:`年月ベースでは ${dominantElements} が強く出やすく、逆に ${weakElements} を意識するとバランスが整いやすい傾向です。誕生日の日がわかると、日柱・通変星・身強弱まで一段深く特定できます。`,
      insightCards:[
        {kicker:'CLIMATE',title:'表に出やすい気質',body:`${seasonCopy} 年月だけでも、外から見える印象と育ってきた環境の癖はかなり読めます。`},
        {kicker:'DOMINANT',title:'強く出やすい五行',body:`この月に強く出やすいのは ${dominantElements} です。役割としては、目の前の流れを動かすより「どう整えるか」が鍵になりやすい配置です。`},
        {kicker:'PRECISION',title:'読みのブレやすい点',body:meimei.monthCandidates?.length>1?`月柱候補が複数あるため、月初と月末では印象や得意役割の出方が少し変わる可能性があります。`:`この月は候補の揺れが少なく、年月だけでも骨格が比較的はっきり読めます。`},
        {kicker:'NEXT',title:'精度を上げる入口',body:'日がわかると「自分の芯」と「何に負荷がかかりやすいか」が明確になります。今は年柱・月柱から外に現れやすい傾向を重視して読んでいます。'},
      ],
      tags:[
        `年柱候補 ${meimei.yearCandidates.map(item=>item.key).join(' / ')}`,
        `月柱候補 ${meimei.monthCandidates.map(item=>item.key).join(' / ')}`,
        `強く出やすい五行 ${dominantElements}`,
      ],
      candidateCards:[
        {label:'年柱候補',value:meimei.yearCandidates.map(item=>item.key).join(' / '),copy:meimei.yearCandidates.map(item=>`${formatCandidateDays(item.days)}に出やすい`).join('｜')},
        {label:'月柱候補',value:meimei.monthCandidates.map(item=>item.key).join(' / '),copy:meimei.monthCandidates.map(item=>`${formatCandidateDays(item.days)}に出やすい`).join('｜')},
      ],
      note:`五行の偏りは ${dominantElements} が優勢です。${weakElements} の動きを生活に足すと、年月ベースでも読みの実感が出やすくなります。`,
    };
  }

  const topGods=countTenGodsFromPillars(meimei.pillars).slice(0,2);
  const branchLead=meimei.branchDynamics?.relations?.[0]||null;
  const godText=topGods.length?topGods.map(item=>TEN_GOD_SHORT[item.key]||item.key).join('・'):'バランス型の資質';
  const currentCycle=meimei.fortune?.currentCycle||null;
  const strengthText=meimei.strengthLabel==='身強'
    ?'自力で局面を動かす力が強く、押し出しを活かすほど手応えを取りやすい命式です。'
    :meimei.strengthLabel==='やや身強'
      ?'押し出しと安定感を両立しやすく、主導権を握ると流れが整いやすい命式です。'
      :meimei.strengthLabel==='身弱'
        ?'環境や相手の影響を受けやすいぶん、感受性と観察の精度が高い命式です。'
        :meimei.strengthLabel==='やや身弱'
          ?'助けや流れを取り込むほど力が出やすく、単独より連携で伸びやすい命式です。'
          :'偏りが強すぎず、状況に応じて役割を切り替えやすい命式です。';
  return{
    core:`${STEM_ARCHETYPES[meimei.dm]||''}。${seasonCopy}${strengthText}`,
    timing:`命式全体では ${dominantElements} が前に出やすく、通変星では ${godText} が強みとして表れやすい流れです。`,
    advice:`使いやすいのは ${meimei.favorableElements.join('・')} の動きです。逆に ${weakElements} が薄くなると偏りが強まりやすいので、行動や環境で補うと安定します。${currentCycle?` 今は大運 ${currentCycle.pillar} が重なりやすく、${currentCycle.copy}`:''}`,
    insightCards:[
      {kicker:'CORE',title:`${meimei.dm}日主の軸`,body:`${STEM_ARCHETYPES[meimei.dm]||''}。${seasonCopy}`},
      {kicker:'STRENGTH',title:'出やすい強み',body:`${strengthText} 命式では ${dominantElements} が濃く、${godText} として表に出やすい傾向です。`},
      {kicker:'RISK',title:'偏りやすいポイント',body:meimei.strengthLabel.includes('身強')?`自力で押し切れる反面、周囲のペースを待たずに進めすぎると摩擦が出やすい命式です。`:`受け止める力が高い反面、環境や人の影響を抱え込みすぎると消耗しやすい命式です。`},
      {kicker:'BALANCE',title:'整え方',body:`喜神候補は ${meimei.favorableElements.join('・')} です。生活や仕事でその要素を足すほど、命式の良さが安定して出やすくなります。`},
      ...(branchLead?[{kicker:'DYNAMICS',title:'地支の関係性',body:branchLead.summary}]:[]),
    ],
    tags:[
      `${meimei.dm}日主`,
      `身強弱 ${meimei.strengthLabel}`,
      `優勢五行 ${dominantElements}`,
      topGods.length?`強く出やすい星 ${topGods.map(item=>item.key).join('・')}`:'',
      branchLead?`地支関係 ${branchLead.left}${branchLead.label}${branchLead.right}`:'',
    ].filter(Boolean),
    candidateCards:[],
    note:`${dominantElements} が強く、${weakElements} を補う意識がバランス調整に役立ちます。${branchLead?` 命式内では ${branchLead.left} と ${branchLead.right} の ${branchLead.label} が出ており、${BRANCH_RELATION_COPY[branchLead.type]}`:''}${meimei.birthHour===null?' 出生時刻は不明として時柱を仮置きしています。':''}`,
  };
}

function buildNameJudgeInsights(nameJudge){
  if(!nameJudge) return null;
  const jin=nameJudge.kakus[1];
  const gai=nameJudge.kakus[3];
  const sou=nameJudge.kakus[4];
  const chi=nameJudge.kakus[2];
  const jinLuck=getKakuLuck(jin.num);
  const gaiLuck=getKakuLuck(gai.num);
  const souLuck=getKakuLuck(sou.num);
  const chiLuck=getKakuLuck(chi.num);
  const jinElem=getNameElement(jin.num);
  const gaiElem=getNameElement(gai.num);
  const souElem=getNameElement(sou.num);
  const chiElem=getNameElement(chi.num);
  const threeTalent=evaluateThreeTalents(nameJudge);
  const yinYang=evaluateYinYangBalance(nameJudge);
  const splitNotes={
    space:'姓名はスペース区切りで判定しています。',
    dictionary:'スペースなし入力を一般的な姓の辞書から分割しています。',
    heuristic:'スペースなし入力を文字数から仮分割しています。姓と名を区切ると精度が上がります。',
  };
  const alternativeText=(nameJudge.split?.alternatives||[])
    .map(item=>`${item.sei} ${item.mei}`)
    .join(' / ');
  return{
    core:`人格${jin.num}画は ${NAME_ELEMENT_COPY[jinElem]} を司る格で、${NAME_ELEMENT_DETAIL[jinElem]}傾向があります。${getLuckTone(jinLuck.lbl)}ので、この名前では「どう芯を出すか」が重要になります。`,
    timing:`地格${chi.num}画は ${NAME_ELEMENT_COPY[chiElem]} の出方を示し、${getLuckTone(chiLuck.lbl)}ため、若い時期や新しい環境での立ち上がり方に特徴が出やすいです。`,
    advice:`総格${sou.num}画は ${NAME_ELEMENT_COPY[souElem]} を人生後半へ運びます。${getLuckTone(souLuck.lbl)}ので、長期では ${NAME_ELEMENT_DETAIL[souElem]}動き方が名前の強みを活かしやすくします。`,
    insightCards:[
      {kicker:'PERSONA',title:'人格が示す核心',body:`人格${jin.num}画・${jinLuck.lbl}。${NAME_ELEMENT_DETAIL[jinElem]}ため、この名前では「自分の軸の出し方」が最も重要になります。`},
      {kicker:'SOCIAL',title:'外格が示す対人面',body:`外格${gai.num}画・${gaiLuck.lbl}。${NAME_ELEMENT_DETAIL[gaiElem]}ため、第一印象や人との距離感にこの傾向が出やすくなります。`},
      {kicker:'THREE TALENTS',title:'三才配置の流れ',body:`${threeTalent.pattern}の${threeTalent.label}。${threeTalent.summary}`},
      {kicker:'YIN / YANG',title:'陰陽の並び',body:`陽${yinYang.odd} / 陰${yinYang.even} の${yinYang.label}。${yinYang.summary}`},
    ],
    tags:[
      `人格${jin.num}画 ${jinLuck.lbl}`,
      `総格${sou.num}画 ${souLuck.lbl}`,
      `三才 ${threeTalent.pattern} ${threeTalent.label}`,
      `陰陽 ${yinYang.label}`,
    ],
    splitNote:[splitNotes[nameJudge.split?.source]||'',alternativeText?`別候補: ${alternativeText}`:''].filter(Boolean).join(' '),
    threeTalent,
    yinYang,
  };
}

function getElementThemeList(counter,limit=2){
  return getRankedEntries(counter,limit)
    .filter(item=>item.value>0)
    .map(item=>NAME_ELEMENT_COPY[item.key]||item.key);
}

function getBirthStyleCopy(strengthLabel=''){
  if(strengthLabel==='身強') return '自分から流れを作るほうが調子を上げやすいタイプです。';
  if(strengthLabel==='やや身強') return '前に出る場面では特に力を出しやすいタイプです。';
  if(strengthLabel==='身弱') return '周囲の流れを受け取りながら動くと精度が上がりやすいタイプです。';
  if(strengthLabel==='やや身弱') return '一人で抱えるより、助けや流れを取り入れると持ち味が出やすいタイプです。';
  return '前に出る役と支える役を切り替えながら力を出しやすいタイプです。';
}

function getFortuneToneText(item){
  if(!item) return '';
  return FORTUNE_TEN_GOD_COPY[item.tenGod]||'役割や向き合い方の切り替えが起こりやすい時期です。';
}

function buildBirthPlainInsight(meimei){
  if(!meimei) return null;
  const seasonCopy=MONTH_BRANCH_COPY[meimei.seasonBranch]||'季節の影響が色濃く出やすい生まれです。';
  const strongThemes=getElementThemeList(meimei.cnt,2);
  const supportThemes=getWeakElements(meimei.cnt,2).map(key=>NAME_ELEMENT_COPY[key]||key).filter(Boolean);
  const strongText=strongThemes.join('・')||'安定';
  const supportText=supportThemes.join('・')||'休息や調整';
  if(meimei.mode==='partial'){
    return{
      overview:`${seasonCopy} 今回は生まれた日が未入力のため、外から伝わりやすい雰囲気や、育ってきた環境との相性を中心に見ています。`,
      timing:meimei.monthCandidates?.length>1
        ?'生まれた日の位置によって、印象や得意な動き方に少し幅が出やすい時期です。'
        :'外に出やすい雰囲気は比較的まっすぐ読み取りやすい生まれです。',
      advice:`得意さは ${strongText} に出やすく、${supportText} を意識して足すと全体のバランスが整いやすくなります。`,
    };
  }
  const longFlow=getFortuneToneText(meimei.fortune?.currentCycle);
  const yearFlow=getFortuneToneText(meimei.fortune?.annual?.find(item=>item.isCurrent));
  return{
    overview:`${STEM_ARCHETYPES[meimei.dm]||'自分なりの個性がはっきり出やすい生まれです。'} ${seasonCopy} ${getBirthStyleCopy(meimei.strengthLabel)}`,
    timing:[longFlow?`少し長い目で見ると、${longFlow}`:'',yearFlow?`この1年は、${yearFlow}`:''].filter(Boolean).join(' '),
    advice:`得意さは ${strongText} に出やすく、${supportText} を意識して補うと安定しやすくなります。${meimei.birthHour===null?' 生まれた時間が不明なため、細かな出方には少し幅を持たせています。':''}`,
  };
}

function buildNamePlainInsight(nameJudge){
  if(!nameJudge) return null;
  const jinElem=getNameElement(nameJudge.kakus[1].num);
  const gaiElem=getNameElement(nameJudge.kakus[3].num);
  const souElem=getNameElement(nameJudge.kakus[4].num);
  const threeTalent=evaluateThreeTalents(nameJudge);
  const yinYang=evaluateYinYangBalance(nameJudge);
  const notes=[];
  if(nameJudge.split?.confidence==='low') notes.push('名前の区切りは仮置きなので、姓と名を分けるとさらに安定します。');
  if(nameJudge.approxChars.length) notes.push('一部の珍しい字は、近い数え方で補っています。');
  return{
    overview:`名前から受ける印象は、${NAME_ELEMENT_DETAIL[jinElem]}傾向があり、自分の軸を出すほど良さが伝わりやすいタイプです。`,
    timing:`第一印象や人との距離感では、${NAME_ELEMENT_DETAIL[gaiElem]}出方が前に出やすい傾向があります。${threeTalent.summary}`,
    advice:`全体としては、${yinYang.summary} 長く見ると、${NAME_ELEMENT_DETAIL[souElem]}動き方が名前の良さを活かしやすくなります。${notes.length?` ${notes.join(' ')}`:''}`,
  };
}

function buildLifePatternPlainText(lp=LP){
  if(!lp) return '誕生日の日が未入力のため、この観点は今回は使っていません。';
  const card=ORACLE[lp];
  const masterNote=card?.master?` ライフパスナンバー${lp}はマスターナンバーであり、通常より高い感受性と使命感を持つ。`:'';
  return `ライフパスナンバー${lp}（${card?.essence||''}）。${card?.msg||'自分らしさが出やすい動き方があります。'}${masterNote} その行動の癖として「${card?.name||''}」のテーマが重なりやすい傾向がある。`;
}

// ══════════════════════════════════════════════════
// 姓名判断（五格）
// ══════════════════════════════════════════════════
// 代表的な漢字の画数テーブル（拡張版）
const KANJI_STROKES={
  '一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10,
  '山':3,'川':3,'田':5,'中':4,'大':3,'小':3,'上':3,'下':3,'木':4,'水':4,
  '火':4,'土':3,'金':8,'花':10,'空':8,'海':9,'星':9,'月':4,'日':4,'年':6,
  '春':9,'夏':10,'秋':9,'冬':5,'光':6,'愛':13,'美':9,'幸':8,'希':7,'望':11,
  '夢':13,'虹':9,'風':9,'雨':8,'雪':11,'香':9,'桜':10,'梅':10,'松':8,'竹':6,
  '和':8,'平':5,'安':6,'心':4,'力':2,'勇':9,'智':12,'仁':4,'義':13,'礼':5,
  '信':9,'誠':13,'健':11,'良':7,'正':5,'真':10,'清':11,'純':10,'明':8,'朗':10,
  '翔':12,'飛':9,'龍':16,'鳳':14,'鷹':24,'雅':13,'薫':16,'葵':12,'菜':11,'彩':11,
  '瑠':14,'璃':15,'琉':11,'珠':10,'玲':9,'瑛':12,'琴':12,'奏':9,'音':9,'響':20,
  '太':4,'郎':9,'男':7,'夫':4,'介':4,'輝':15,'哉':9,'也':3,'吾':7,'悟':10,
  '子':3,'女':3,'里':7,'江':6,'加':5,'代':5,'世':5,'由':5,'美':9,'恵':10,
  '麻':11,'実':8,'果':8,'葉':12,'芽':8,'蕾':19,'蓮':13,'百':6,'千':3,'万':3,
  '一':1,'伊':6,'依':8,'以':5,'位':7,'維':14,'緯':16,
  '田':5,'畑':9,'畠':10,
  '鈴':13,'木':4,'佐':7,'藤':18,'高':10,'橋':16,'田':5,'中':4,'松':8,'山':3,
  '渡':12,'辺':15,'伊':6,'藤':18,'斎':11,'齋':17,'齊':14,'谷':7,'吉':6,'吉':6,
  '村':7,'岡':8,'島':10,'野':11,'川':3,'原':10,'小':3,'林':8,'清':11,'水':4,
  '森':12,'近':7,'遠':13,'長':8,'石':5,'今':4,'池':6,'田':5,'上':3,'西':6,
  '東':8,'南':9,'北':5,'阿':8,'井':4,'工':3,'大':3,'前':9,'後':9,'内':4,
  '新':13,'古':5,'黒':11,'白':5,'青':8,'赤':7,'緑':14,'黄':11,'紫':12,'桃':10,
};
const VARIANT_STROKES={
  '髙':11,'﨑':11,'濱':17,'濵':17,'澤':16,'櫻':21,'廣':15,'國':11,'惠':12,'德':15,
  '榮':14,'黑':12,'實':14,'眞':10,'亞':8,'龜':16,'邊':19,'邉':18,
};
const EXTENDED_NAME_STROKES={
  '優':17,'結':12,'悠':11,'陽':12,'奈':8,'咲':9,'凛':15,'凜':15,'杏':7,'碧':14,
  '楓':13,'湊':12,'蒼':13,'颯':14,'萌':11,'乃':2,'斗':4,'慧':15,'紗':10,'椿':13,
  '遥':12,'遙':14,'詩':13,'織':18,'莉':10,'凪':6,'朔':10,'翔':12,'瑛':12,'渚':11,'衣':6,
  '柚':9,'陽':12,'蓮':13,'颯':14,'珀':9,'琥':12,'琉':11,'愛':13,'奏':9,'湧':12,
  '崎':11,'浜':10,'沢':7,'堀':11,'熊':14,'辻':5,'樋':12,'杉':7,'浅':9,'秋':9,
  '久':3,'保':9,'柴':10,'岸':8,'崎':11,'濱':17,'濵':17,'邉':18,'邊':19,
};

function getStrokeInfo(char){
  // 漢字テーブルにあればその画数、なければ文字コードから推定（平仮名・カタカナ等）
  if(Object.prototype.hasOwnProperty.call(VARIANT_STROKES,char)) return {char,count:VARIANT_STROKES[char],source:'variant'};
  if(Object.prototype.hasOwnProperty.call(KANJI_STROKES,char)) return {char,count:KANJI_STROKES[char],source:'table'};
  if(Object.prototype.hasOwnProperty.call(EXTENDED_NAME_STROKES,char)) return {char,count:EXTENDED_NAME_STROKES[char],source:'extended'};
  const code=char.codePointAt(0);
  // ひらがな
  if(code>=0x3041&&code<=0x3096) return {char,count:((code-0x3041)%10)+1,source:'kana'};
  // カタカナ
  if(code>=0x30A1&&code<=0x30F6) return {char,count:((code-0x30A1)%10)+1,source:'kana'};
  // 基本的な漢字領域
  if(code>=0x4E00&&code<=0x9FFF){
    // 画数の近似値（詳細テーブルにない場合）
    return {char,count:Math.max(1,Math.min(30,Math.floor((code-0x4E00)/300)+1+(code%7))),source:'approx'};
  }
  return {char,count:1,source:'fallback'};
}

function formatStrokeBreakdown(entries){
  return entries.map(entry=>`${entry.char}(${entry.count})`).join('・');
}

function calcNameJudge(fullname){
  const parsed=splitJapaneseFullname(fullname);
  if(!parsed||!parsed.sei||!parsed.mei) return null;
  const sei=parsed.sei, mei=parsed.mei;
  const seiChars=Array.from(sei).map(c=>getStrokeInfo(c));
  const meiChars=Array.from(mei).map(c=>getStrokeInfo(c));
  const seiTotal=seiChars.reduce((sum,entry)=>sum+entry.count,0);
  const meiTotal=meiChars.reduce((sum,entry)=>sum+entry.count,0);

  // 一字姓・一字名の補正
  const useTenReisu=seiChars.length===1;
  const useChiReisu=meiChars.length===1;
  const tenKaku=seiTotal+(useTenReisu?1:0); // 天格：姓の合計（一字姓は補正1を加算）
  const jinKaku=seiChars[seiChars.length-1].count+meiChars[0].count; // 人格：姓の最後＋名の最初
  const chiKaku=meiTotal+(useChiReisu?1:0); // 地格：名の合計（一字名は補正1を加算）
  const gaiKaku=(seiChars.length===1?1:seiChars[0].count)+(meiChars.length===1?1:meiChars[meiChars.length-1].count); // 外格：姓の最初＋名の最後
  const souKaku=seiTotal+meiTotal; // 総格：姓＋名（補正なし）

  const approxChars=[...seiChars,...meiChars]
    .filter(entry=>entry.source==='approx'||entry.source==='fallback')
    .map(entry=>entry.char);
  const sourceStats=[...seiChars,...meiChars].reduce((acc,entry)=>{
    acc[entry.source]=(acc[entry.source]||0)+1;
    return acc;
  },{});
  const kakus=[
    {name:'天格',num:tenKaku,desc:'家系・育った環境から受ける傾向',formula:`${formatStrokeBreakdown(seiChars)}${useTenReisu?' + 補正1':''}`},
    {name:'人格',num:jinKaku,desc:'本人の核心・最も重要な格',formula:`${seiChars[seiChars.length-1].char}(${seiChars[seiChars.length-1].count}) + ${meiChars[0].char}(${meiChars[0].count})`},
    {name:'地格',num:chiKaku,desc:'幼少期〜青年期の土台',formula:`${formatStrokeBreakdown(meiChars)}${useChiReisu?' + 補正1':''}`},
    {name:'外格',num:gaiKaku,desc:'対人・社会との関わり方',formula:`${seiChars.length===1?'補正1':`${seiChars[0].char}(${seiChars[0].count})`} + ${meiChars.length===1?'補正1':`${meiChars[meiChars.length-1].char}(${meiChars[meiChars.length-1].count})`}`},
    {name:'総格',num:souKaku,desc:'人生後半を含む全体傾向',formula:`${formatStrokeBreakdown(seiChars)} + ${formatStrokeBreakdown(meiChars)}`},
  ];
  return{
    sei,mei,kakus,
    seiChars,meiChars,
    reisu:{ten:useTenReisu,chi:useChiReisu,gai:seiChars.length===1||meiChars.length===1},
    approxChars,
    sourceStats,
    split:{
      source:parsed.source,
      confidence:parsed.confidence,
      original:parsed.original,
      alternatives:parsed.alternatives||[],
    },
  };
}

function getKakuLuck(n){
  let num=n;
  while(num>81) num-=80;

  // 五格姓名判断向けの数意分類（簡易判定用）
  const daiKichi=[1,3,5,6,7,8,11,13,15,16,17,21,23,24,25,31,32,37,41,45,47,52,63,65,66,81];
  const kichi=[18,35,48,57,58,61,67,68];
  const shoKyo=[26,27,28];
  const chuKyo=[46,49];
  const chui=[29,33,36,38,39,42,43,51,53,55,56,71,73,75,77,78];
  const kyo=[2,4,12,14,22,30,34,40,44,50,54,59,60,62,64,69,70,72,74,76,79,80];
  const daiKyo=[9,10,19,20];
  if(daiKichi.includes(num)) return{cls:'luck-great',lbl:'大吉'};
  if(kichi.includes(num)) return{cls:'luck-good',lbl:'吉'};
  if(shoKyo.includes(num)) return{cls:'luck-warn',lbl:'小凶'};
  if(chuKyo.includes(num)) return{cls:'luck-warn',lbl:'中凶'};
  if(chui.includes(num)) return{cls:'luck-mid',lbl:'注意'};
  if(kyo.includes(num)) return{cls:'luck-bad',lbl:'凶'};
  if(daiKyo.includes(num)) return{cls:'luck-bad',lbl:'大凶'};
  return{cls:'luck-mid',lbl:'平'};
}

// ══════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════
// 開発者モード：URLパラメータ ?dev で有効化
// 例） http://localhost:3000/uranai-v5.html?dev
const PAGE_PARAMS=new URLSearchParams(location.search);
const DEV_MODE=PAGE_PARAMS.has('dev');
const MEMBER_PREVIEW_PARAM=PAGE_PARAMS.has('member');
const LOCAL_TEST_RUNTIME=location.protocol==='file:'||['127.0.0.1','localhost','::1'].includes(location.hostname)||PAGE_PARAMS.has('dev');
const FILE_PROXY_STORAGE_KEY='uranai-file-proxy-origin-v1';
const FILE_PROXY_CANDIDATES=['http://127.0.0.1:3000','http://localhost:3000','http://127.0.0.1:3060','http://localhost:3060','http://127.0.0.1:3062','http://localhost:3062'];
let FILE_PROXY_ORIGIN='';
const DEVELOPER_DEFAULT_EMAIL='tekechannnel@gmail.com';
const DEVELOPER_DEFAULT_NAME='開発者';

// ▼ 開発用の直接APIキー。公開運用では server.js 側の OPENAI_API_KEY / ANTHROPIC_API_KEY を使うこと。
const OPERATOR_API_KEY='';
const API_PROXY_ENDPOINT='/api/ai/generate';
const GOOGLE_AUTH_ENDPOINT='/api/auth/google';
const MEMBER_STATUS_ENDPOINT='/api/member/status';
const MEMBER_SESSION_ENDPOINT='/api/member/session';
const MEMBER_LOGOUT_ENDPOINT='/api/member/logout';
const STRIPE_CHECKOUT_ENDPOINT='/api/stripe/checkout-session';
const STRIPE_CHECKOUT_COMPLETE_ENDPOINT='/api/stripe/checkout/complete';
const STRIPE_PORTAL_ENDPOINT='/api/stripe/portal-session';
const VAULT_QUERY_ENDPOINT='/api/vault/history/query';
const VAULT_SAVE_ENDPOINT='/api/vault/history/save';
const VAULT_CLEAR_ENDPOINT='/api/vault/history/clear';
const CLIENT_LOG_ENDPOINT='/api/client-log';
const INPUT_STORAGE_KEY='uranai-input';
const INPUT_SAVE_PREF_KEY='uranai-input-autosave-v1';
const HISTORY_STORAGE_KEY='uranai-history-v1';
const MEMBER_STORAGE_KEY='uranai-member-preview-v1';
const STRIPE_RETURN_INTENT_KEY='uranai-stripe-return-intent-v1';
const FREE_LEN_COUNT=3;
const FREE_ORC_COUNT=1;
const LEN_FREE_POSITION_LABELS=['背景','現状の核心','次の流れ'];

try{
  if(location.protocol==='file:'){
    FILE_PROXY_ORIGIN=sessionStorage.getItem(FILE_PROXY_STORAGE_KEY)||localStorage.getItem(FILE_PROXY_STORAGE_KEY)||'';
  }
}catch(e){
  FILE_PROXY_ORIGIN='';
}

const REACTION_QUESTION_BANK={
  stress_play:{
    prompt:'複数人で進めていることが、軽いノリや油断で崩れたとき、内心いちばん引っかかるのは？',
    options:[
      {id:'win_break',label:'成果や着地点が遠のく感じにイラッとする',axis:'drive'},
      {id:'mood_break',label:'場の空気が冷えるのがしんどい',axis:'connection'},
      {id:'move_block',label:'自分の動きまで制限される感じが嫌だ',axis:'autonomy'},
      {id:'meaning_break',label:'大事にしていた意味や基準が壊れるのが無理だ',axis:'ideal'},
    ],
  },
  stress_rule:{
    prompt:'意味がわからないルールや指示を押しつけられたとき、いちばん嫌なのは？',
    options:[
      {id:'lose_efficiency',label:'損する・勝てない・成果が落ちること',axis:'drive'},
      {id:'relationship_cold',label:'人間関係や場の空気が悪くなること',axis:'connection'},
      {id:'interference',label:'自分のやり方に口を出されること',axis:'autonomy'},
      {id:'no_meaning',label:'納得感や美しさがないこと',axis:'ideal'},
    ],
  },
  drive_style:{
    prompt:'難しい課題を前にしたとき、気持ちが乗りやすいのはどちらに近い？',
    options:[
      {id:'direct',label:'まず自分で前に出て、突破口を開きたい'},
      {id:'strategic',label:'人や段取りを動かして、通る道筋を作りたい'},
    ],
  },
  connection_style:{
    prompt:'嬉しかった出来事を思い出すと、どちらの余韻が強い？',
    options:[
      {id:'broad',label:'大勢から好かれた、盛り上がった、注目された'},
      {id:'deep',label:'一人と深く通じた、特別に信頼された'},
    ],
  },
  autonomy_style:{
    prompt:'濃いコミュニティや新しい環境に入った直後、自然なのはどちら？',
    options:[
      {id:'observe',label:'少し距離を取って、様子と情報を見たい'},
      {id:'dive',label:'中に入って試しながら把握したい'},
    ],
  },
  ideal_focus:{
    prompt:'強く惹かれる対象を見たとき、最初に心を持っていかれるのはどれ？',
    options:[
      {id:'person',label:'こういう人間になりたい、という生き方や人格'},
      {id:'work',label:'こういう仕事をしたい、という使命感や働き方'},
      {id:'style',label:'こういう雰囲気で在りたい、という見せ方や空気感'},
    ],
  },
  ideal_person_distance:{
    prompt:'理想の人物像を見た帰り道、内心はどちらに近い？',
    options:[
      {id:'forward',label:'まだ近づける気がする。頑張ろうと思う'},
      {id:'conflicted',label:'やっぱり自分は届かないかもしれないと揺れる'},
    ],
  },
  ideal_work_priority:{
    prompt:'仕事と大切な人の都合がぶつかったとき、守りたいのはどちらに近い？',
    options:[
      {id:'balance',label:'両方が成り立つ形を探したい'},
      {id:'mission',label:'まずは仕事や役目を通したい'},
    ],
  },
  ideal_work_distance:{
    prompt:'その理想の働き方に対して、内心はどちらに近い？',
    options:[
      {id:'forward',label:'工夫すれば実現に近づける気がする'},
      {id:'conflicted',label:'現実との距離が大きく、苦しさも強い'},
    ],
  },
  ideal_style_direction:{
    prompt:'憧れを取り入れるなら、自然なのはどちらに近い？',
    options:[
      {id:'inner',label:'考え方や内面まで染み込ませたい'},
      {id:'perform',label:'まずは見せ方や振る舞いから近づきたい'},
    ],
  },
  ideal_style_tone:{
    prompt:'その理想を取り入れるとき、感覚として近いのはどちら？',
    options:[
      {id:'forward',label:'楽しい高揚感があり、伸びていく感じがする'},
      {id:'conflicted',label:'必要だからやる感覚が強く、ギャップもしんどい'},
    ],
  },
};

const REACTION_AXIS_HINTS={
  drive:'いまは「段取りや成果が崩れる場面」に反応が集まっています。',
  connection:'いまは「人との温度差や関係の冷え」に反応が集まっています。',
  autonomy:'いまは「干渉されて自由が削られる場面」に反応が集まっています。',
  ideal:'いまは「意味・理想・美意識が崩れる場面」に反応が集まっています。',
};

const REACTION_PROFILE_DEFS={
  drive_direct:{
    summary:'段取りや成果が崩れる場面に強く反応しやすく、最終的には自分で前に出たほうが心が整いやすい傾向です。',
    stress:'足を引っ張られること、軽く扱われること、最後までやり切る気が見えないこと',
    power:'突破力、決断力、短時間で流れを変える力',
    handling:'裁量・敬意・明確な目標があると力が出やすく、細かい管理だけが続くと摩耗しやすいタイプです。',
    tags:['突破力','自力で動く','流れを変える'],
  },
  drive_strategic:{
    summary:'段取りや成果が崩れる場面に強く反応しやすく、自分一人で押すよりも、人や配置を動かして前へ進めるほうに気持ちが乗りやすい傾向です。',
    stress:'段取りが悪いこと、非効率、動ける人が活かされないこと',
    power:'人を巻き込む力、段取り力、局面を読む速さ',
    handling:'役割分担と成果条件がはっきりすると強く、ルールが曖昧なまま責任だけ背負うと荒れやすいタイプです。',
    tags:['段取り','影響力','流れを設計する'],
  },
  connection_broad:{
    summary:'場の温度や人からの反応に強く影響されやすく、広く好かれたり盛り上がったりすると一気にエネルギーが出る傾向です。',
    stress:'空気が冷えること、無視されること、反応が返らないこと',
    power:'場を明るくする力、瞬発力、華やかな巻き込み',
    handling:'反応が返る環境、短い目標、楽しさのある役割で伸びやすく、退屈な反復だけが続くと失速しやすいタイプです。',
    tags:['反応','盛り上げ','瞬発力'],
  },
  connection_deep:{
    summary:'人との距離感や信頼に強く反応しやすく、広く注目されることよりも、深く通じる関係で力を出しやすい傾向です。',
    stress:'雑に扱われること、誤解されること、信頼を裏切られること',
    power:'誠実さ、共感力、一対一で関係を育てる力',
    handling:'安心できる関係と感謝があるほど安定し、強すぎる競争や雑なノリが続くと消耗しやすいタイプです。',
    tags:['信頼','共感','少人数'],
  },
  autonomy_observe:{
    summary:'干渉や圧の強い場面に反応しやすく、距離を取りながら情報を集められるほうが心が安定しやすい傾向です。',
    stress:'急に距離を詰められること、同調圧力、雑な口出し',
    power:'観察力、情報整理、静かな判断の正確さ',
    handling:'先に背景情報を共有されること、ひとりで考える時間、静かな環境があるほど力を出しやすいタイプです。',
    tags:['距離感','観察','情報整理'],
  },
  autonomy_dive:{
    summary:'干渉や停滞に反応しやすく、外から見ているよりも、自分で飛び込んで構造を掴むほうが調子を上げやすい傾向です。',
    stress:'つまらない停滞、自由に試せないこと、工夫の余地がないこと',
    power:'試行回数、実地で学ぶ速さ、挑戦の回転力',
    handling:'興味で動ける余白、新しい課題、実験が許される環境で伸びやすく、単調さが続くと一気に飽きやすいタイプです。',
    tags:['実地','試行回数','挑戦'],
  },
  ideal_person_forward:{
    summary:'理想の人物像に心を動かされやすく、その理想に自分も近づけると感じると、大きく前へ進みやすい傾向です。',
    stress:'誠実さの欠如、基準の低さ、自分の理想からのズレ',
    power:'誠実さ、継続力、信頼される在り方',
    handling:'意味や理念に接続された依頼、具体的な改善の道筋、誠実な関係で力を出しやすいタイプです。',
    tags:['人格','誠実さ','継続力'],
  },
  ideal_person_conflicted:{
    summary:'理想の人物像に強く引かれやすい一方で、自分との距離にも敏感で、その葛藤が深い感受性や表現力につながりやすい傾向です。',
    stress:'理想と現実の差、自己否定、価値観の雑な扱い',
    power:'共感力、繊細さ、迷いを言葉に変える力',
    handling:'理想と苦しさの両方を否定されないこと、小さな前進の可視化、表現の逃げ場があるほど整いやすいタイプです。',
    tags:['理想','感受性','共感'],
  },
  ideal_work_balance_forward:{
    summary:'仕事だけでなく、人間関係や暮らし全体の調和に心を動かされやすく、実現へ向かう手応えがあると丁寧に積み上げやすい傾向です。',
    stress:'大事なものを切り捨てること、調和が壊れること、優先順位の乱れ',
    power:'調整力、多面的な視点、全体を整える力',
    handling:'関係者全体に意味がある役割、優先順位の整理、丁寧さを評価される環境で伸びやすいタイプです。',
    tags:['調和','全体最適','丁寧さ'],
  },
  ideal_work_balance_conflicted:{
    summary:'仕事も人間関係も両立したい理想が強い一方で、その実現の難しさにも敏感で、抱え込みやすい傾向です。',
    stress:'自己犠牲の蓄積、理想倒れ、両立不能感',
    power:'洞察力、共感力、簡単に投げない粘り',
    handling:'抱え込みに気づいてもらえること、理想を小さな一歩に分けること、弱音を出せる相手がいるほど安定しやすいタイプです。',
    tags:['両立','洞察','粘り'],
  },
  ideal_work_mission_forward:{
    summary:'意味のある仕事や使命に強く反応しやすく、自分が前へ進められる感覚があると一気に没頭しやすい傾向です。',
    stress:'停滞、ぬるさ、やる意味を感じないこと',
    power:'集中力、改革推進力、やりがいへの火力',
    handling:'大義のある難題、自由度、前進を実感できる役割で力を出しやすく、退屈な惰性が続くと熱が落ちやすいタイプです。',
    tags:['使命','没頭','前進'],
  },
  ideal_work_mission_conflicted:{
    summary:'意味のある仕事や前進への欲求が強い一方で、現実の重さや進まなさにも強く反応しやすく、怒りや絶望が燃料になりやすい傾向です。',
    stress:'停滞、無力感、理想を潰す構造',
    power:'問題解決への執念、難所での粘着力、変革への圧',
    handling:'怒りを建設的な課題解決へ向けること、伴走者がいること、破壊より設計へ意識を戻せると強みが活きるタイプです。',
    tags:['変革','執念','難所対応'],
  },
  ideal_style_inner_forward:{
    summary:'外部の理想をそのまま真似るより、内面まで吸収して自分のものにしたい気持ちが強く、うまく噛み合うと大きく伸びやすい傾向です。',
    stress:'芯のない模倣、自分の言葉にならないこと、浅さ',
    power:'吸収力、モチベーション、理想を自分化する力',
    handling:'良い手本と高い基準、実践の場、自分の言葉に置き換える時間があるほど力を出しやすいタイプです。',
    tags:['吸収','内面化','伸びしろ'],
  },
  ideal_style_inner_conflicted:{
    summary:'外部の理想を深く取り込みたい一方で、それが自分のものになり切らない苦しさにも敏感で、軸探しに迷いやすい傾向です。',
    stress:'やらされ感、自分の言葉が出ないこと、軸のなさ',
    power:'適応力、吸収の速さ、状況への柔らかさ',
    handling:'なぜそれを選ぶのかを自分の言葉で確かめること、外圧だけで走らせないこと、納得感が整うと安定しやすいタイプです。',
    tags:['軸探し','適応','内省'],
  },
  ideal_style_perform_forward:{
    summary:'理想の見せ方や雰囲気に心を動かされやすく、それを演出しながら磨いていくことに高揚感を持ちやすい傾向です。',
    stress:'ダサさ、見せ場のなさ、表現が死ぬこと',
    power:'表現力、パフォーマンス力、自己演出の上手さ',
    handling:'舞台や観客があること、見せ方が成果につながる役割、表現と中身の両方を育てる環境で伸びやすいタイプです。',
    tags:['表現','演出','高揚感'],
  },
  ideal_style_perform_conflicted:{
    summary:'理想の見せ方に強く引かれやすい一方で、現実の自分との差にも敏感で、その痛みが深い表現力に変わりやすい傾向です。',
    stress:'理想とのギャップ、自己否定、無理な自己演出',
    power:'影のある表現力、共感力、深み',
    handling:'ギャップの苦しさを恥にしないこと、安全に試せる場、本音と作品をつなげることが整いやすさにつながるタイプです。',
    tags:['ギャップ','深み','表現'],
  },
};

const AI_MODEL_CONFIG={
  free:{
    provider:'openai',
    model:'gpt-5.4-mini',
    reasoningEffort:'low',
    fallbackProvider:'',
    fallbackModel:'',
  },
  paid:{
    provider:'anthropic',
    model:'claude-sonnet-4-20250514',
    reasoningEffort:'high',
    fallbackProvider:'',
    fallbackModel:'',
  },
  dossier:{
    provider:'anthropic',
    model:'claude-sonnet-4-20250514',
    reasoningEffort:'high',
    fallbackProvider:'',
    fallbackModel:'',
  },
  followup:{
    provider:'anthropic',
    model:'claude-sonnet-4-20250514',
    reasoningEffort:'high',
    fallbackProvider:'',
    fallbackModel:'',
  },
};

const IMAGE_DETAIL_CONFIG={
  free:'low',
  paid:'high',
  dossier:'high',
  followup:'high',
};

let PLAN='free';
let GENDER='female';
let API_KEY='';
let MEIMEI=null, LP=null, NAMEJUDGE=null;
let REACTION_PROFILE=null;
let REACTION_ANSWERS={};
let SEL_LEN=[], SEL_ORC=[];
let FIXED_GENDER_CARD=null;
let lenShuffling=false, orcShuffling=false;
let lenInterval=null, orcInterval=null;
let orcSelCards=[];
let CLARIFY_ANSWERS={};
let CLARIFY_ACTIVE_QUESTIONS=[];
let MEMBER_MODE=false;
let MEMBER_AUTH={
  checked:false,
  active:false,
  source:'',
  expiresAt:'',
  localTestMode:false,
  codeConfigured:false,
  sessionPersistent:false,
  authLoggedIn:false,
  authProvider:'',
  authSessionPersistent:false,
  developerAccess:false,
  googleClientConfigured:false,
  googleClientId:'',
  userId:'',
  userName:'',
  userEmail:'',
  userPicture:'',
  error:'',
  stripeEnabled:false,
  stripeCheckoutReady:false,
  stripePortalReady:false,
  stripeWebhookReady:false,
  subscriptionStatus:'',
  customerEmail:'',
  customerName:'',
  productLabel:'',
  currentPeriodEnd:'',
  cancelAtPeriodEnd:false,
  manageBillingAvailable:false,
};
let MEMBER_PENDING_INTENT='';
let CURRENT_READING_ID='';
let CLIENT_LOGGING_READY=false;
const SENT_CLIENT_LOG_KEYS=new Set();
let CURRENT_READING_CREATED_AT='';
let ACTIVE_FOLLOWUP_KEY='';
let FOLLOWUP_LOADING=false;
let DOSSIER_LOADING=false;
let LAST_OUTPUTS={about:'',foundationDeep:'',len:'',orc:'',integration:'',dossier:'',followups:{}};
let GOOGLE_SIGNIN_RENDER_TIMER=0;
let HISTORY_SYNC_STATE={
  loading:false,
  lastScope:'',
  lastVaultMode:'',
  lastUserId:'',
};
const RESULT_STAGE_DEFS_BASE=[
  {key:'len',label:'ルノルマン',copy:'カードの流れを読み、現状と次の分岐を整理しています。'},
  {key:'orc',label:'オラクル',copy:'気持ちの底にあるテーマと整え方を言葉にしています。'},
  {key:'integration',label:'結論',copy:'出そろった読みを束ね、今日から動ける答えへまとめています。'},
  {key:'basic',label:'土台の整理',copy:'名前・生まれ・魂の本質診断から、判断の癖を補足しています。'},
];
const RESULT_STAGE_DEFS_PAID=[...RESULT_STAGE_DEFS_BASE];
let RESULT_STAGE_STATE={};
let SOLAR_TERM_BOUNDARIES={};
let SOLAR_TERM_DATA_READY=false;
const RESULT_STAGE_MIN_MS={basic:180,len:900,orc:900,integration:1100};
let RUNTIME_HEALTH={
  checked:false,
  reachable:false,
  openai:false,
  anthropic:false,
  google:false,
  paidTestMode:false,
  memberCodeConfigured:false,
  stripeCheckoutReady:false,
  stripePortalReady:false,
  error:'',
  mode:'',
};

const FOLLOWUP_PRESETS={
  core:{
    label:'いちばん大事なこと',
    intro:'今回の鑑定全体から、最重要の気づきだけをさらに鋭く掘り下げてください。',
  },
  feelings:{
    label:'相手やまわりの気持ち',
    intro:'関係性や人物カードの気配をもとに、相手や周囲の心理を慎重に読み解いてください。断言しすぎず、複数可能性も扱ってください。',
  },
  week:{
    label:'この7日でやること',
    intro:'今から7日間で現実を動かすための実践計画を、1日ごとに具体的な行動へ落とし込んでください。',
  },
  timing:{
    label:'次に動くタイミング',
    intro:'次の転機が近づくサイン、見逃さないための観察ポイント、動くべきタイミングを現実的に示してください。',
  }
};

const BRAND_PROFILE={
  appName:'羅針占術',
  appSubtitle:'あなたに眠る羅針盤を呼び覚ます',
  hero:{
    valueEyebrow:'内なる羅針盤',
    valueTitle:'内側の羅針盤が、どちらを向いているか',
    points:[
      {num:'01',title:'迷いの正体が見えてくる',copy:'目の前の悩みだけでなく、「自分はいま何に引っかかっているのか」まで輪郭が出てきます。'},
      {num:'02',title:'現実の方角が見えてくる',copy:'きれいごとで包まず、それでも前を向ける形で、いま向き合うべき現実が整理されます。'},
      {num:'03',title:'自分で進路を選べる',copy:'誰かの推奨ではなく、「自分はこう進もう」と決めるための行動指針が手元に残ります。'},
    ],
    archiveEyebrow:'羅針記録',
    archiveTitle:'積み上げるほど、自分の羅針盤の癖が見えてくる',
    archiveEmpty:'初回は無料で、自分の羅針盤がいまどちらを向いているかに気づけます。深掘り鑑定では、具体的な悩みをほどき、あとから読み返せる行動指針まで残ります。',
  },
  guide:{
    eyebrow:'羅針占術',
    name:'羅針占術のスタンス',
    role:'灯台ではなく、あなたが選ぶためのコンパス',
    sigil:'✶',
    shellLabel:'羅針占術ノート',
    quote:'ここは、外から答えを与えてもらう場所ではありません。自分を知り、自分で選ぶために、いまの本質と現実を丁寧に読む場所です。',
    note:'羅針占術が大事にするのは、迷いを神秘で包むことではなく、迷いの構造をほどき、自分で進む確信を返すことです。',
  },
  offers:{
    free:{
      badge:'無料',
      title:'無料で、いまの羅針盤の向きを知る',
      price:'0円 / はじめの1回',
      items:[
        'ルノルマン3枚・オラクル1枚で、流れと次の一歩まで読む',
        '迷いの背景・現状・次の流れを、無料でも最低限つかめる',
        '深掘り鑑定との相性を確かめられる',
      ],
    },
    member:{
      badge:'深掘り',
      title:'深掘り鑑定で、進路を自分で選べるようになる',
      price:'月額2,000〜3,000円前後を予定',
      items:[
        '具体的な悩みの構造と本音を整理できる',
        '次にどちらへ進むかが現実レベルで具体的に残る',
        '保存して読み返せる羅針盤の記録が手元に残る',
      ],
    },
  },
};

const MEMBERSHIP_PLAN={
  price:'月額2,000〜3,000円前後を予定',
  status:'読み返しと記録は準備中',
  promise:'眠っている羅針盤を呼び覚まし、悩みを具体的な進路まで落とし込む鑑定です',
  description:'無料で見えた「いまの向き」を土台に、ここからは具体的な悩みを深く読みます。現実を直視しながらも可能性を失わず、次にどちらへ進むかまで保存できる形で受け取れます。',
  lead:[
    '外から答えをもらって安心するための占いではなく、現実を見たうえで、それでも自分で進路を選べるところまで持っていきたいと考えています。',
    '深掘り鑑定では、「ちゃんとわかってもらえた」という感覚と、「自分はこの方向へ進もう」という具体性が、同時に残るようにしています。'
  ],
  features:[
    {
      eyebrow:'01 / 受け止める',
      title:'「自分はいま何に引っかかっているのか」まで、言葉になる',
      summary:'表面だけで終わらず、本質と本音の核心まで言葉にしていく。',
      problemLabel:'短い占いだと',
      problem:'状況を読んで「そうかもしれない」で終わりがちです。本当に知りたい「なぜこんなに気になるのか」「自分はどういう性質なのか」が、置き去りのままになることがあります。',
      solutionLabel:'深掘り鑑定では',
      solution:'背景や感情の揺れまでたどりながら、答えを急がずに読み解きます。うまく言えなかったことにも輪郭を与え、「自分とは何か」に近づけるようにします。',
      outcomeLabel:'読み終わると',
      outcome:'「ちゃんとわかってもらえた」と「自分でもわかってきた」という感覚が残ります。',
    },
    {
      eyebrow:'02 / 動かす',
      title:'「じゃあ自分はこう選ぼう」という具体的な一手が残る',
      summary:'励ましで終わらず、自分で選べる行動まで落とし込む。',
      problemLabel:'やさしい言葉だけだと',
      problem:'少し楽になっても、現実で何を変えればいいかが曖昧なまま。また同じところで詰まってしまうことがあります。勇気にはつながらない。',
      solutionLabel:'ここで整えるのは',
      solution:'いま起きていることを整理し、見落としやすい分岐点を言葉にしたうえで、今日から取りやすい行動まで具体的に返します。誰かの推奨ではなく、あなたが選ぶための材料として渡します。',
      outcomeLabel:'読み終わると',
      outcome:'「じゃあ自分はこれを選ぼう」と、前向きに閉じられます。',
    },
    {
      eyebrow:'03 / 積み上げる',
      title:'同じ悩みを無にせず、自分の判断材料として残せる',
      summary:'一回きりで消えず、読み返すほど自分の本質とパターンが見えてくる。',
      problemLabel:'その場だけだと',
      problem:'時間がたつと内容が薄れてしまい、同じ迷いをまた最初から考え直してしまいます。自己肯定感が低いと、せっかくの気づきまで無にしてしまいやすい。',
      solutionLabel:'記録として残るから',
      solution:'鑑定を保存し、続けるほど繰り返すテーマや選びがちなパターンが見えてきます。前回の自分の言葉を、次の判断を支えるコンパスとして使えます。',
      outcomeLabel:'積み上がると',
      outcome:'迷ったとき、ゼロから考えるのではなく、自分の記録を手がかりに可能性を取り戻せます。',
    },
  ],
};

// 全カード・各3問の解釈絞り込みテンプレート
const CLARIFY_DEF={
  1:{card:'騎士',qs:[
    {q:'今、誰かからの連絡や知らせを待っていますか？',templates:['恋愛相手からの連絡を待っている','仕事・採用の知らせを待っている','友人・知人からの返事待ち','特に待っている連絡はない']},
    {q:'何かに向けて急いで動きたい気持ちがありますか？',templates:['早く決断・行動したい','少し焦りを感じている','焦りたくないが状況が急かしている','特に急いでいない']},
    {q:'新しい出会いや環境の変化を求めていますか？',templates:['新しい人との出会いを期待している','環境を変えたいと思っている','変化より安定を求めている','どちらとも言えない']}
  ]},
  2:{card:'クローバー',qs:[
    {q:'最近、偶然の幸運やラッキーな出来事がありましたか？',templates:['思いがけない幸運があった','小さな幸せを感じることが増えた','特に運がいいとは感じない','むしろ不運が続いている']},
    {q:'今、チャンスの波に乗れているという感覚がありますか？',templates:['流れに乗れている感じがする','チャンスはあるが掴めていない','チャンスが見えていない','慎重になりすぎているかもしれない']},
    {q:'その幸運や機会は長続きしてほしいと感じていますか？',templates:['できれば長く続いてほしい','一時的でも十分嬉しい','まだ実感がない','どうなるかわからない']}
  ]},
  3:{card:'船',qs:[
    {q:'引っ越しや旅行、海外・遠方との関わりを考えていますか？',templates:['引っ越し・転居を考えている','旅行や出張の予定がある','海外・遠方との関わりがある','今は移動の予定がない']},
    {q:'今の状況から離れて、新しい場所へ踏み出したい気持ちがありますか？',templates:['今の環境から変わりたい','心機一転したいと思っている','現状に留まりたい','まだ迷っている']},
    {q:'遠方・海外にいる人との関係で気になることはありますか？',templates:['遠距離の人との縁がある','海外・遠方のビジネスに関わっている','特にそういった縁はない','これから遠方との縁ができそう']}
  ]},
  4:{card:'家',qs:[
    {q:'家族や自宅・プライベートな環境について気になることはありますか？',templates:['家族との関係で悩んでいることがある','自宅・住まいに関する問題がある','家族との絆を大切にしたい','プライベートは安定している']},
    {q:'今、安心できる「帰れる場所」がありますか？',templates:['心の拠り所がある','少し不安定を感じている','安心できる環境を作りたい','一人でいることが多い']},
    {q:'家・家庭に関する変化（同居・別居・引っ越し等）を考えていますか？',templates:['同居や引っ越しを検討している','家庭内に変化が起きそう','現状維持でいきたい','特に変化の予定はない']}
  ]},
  5:{card:'樹木',qs:[
    {q:'健康面で気になっていることや体の変化はありますか？',templates:['体調が優れない','慢性的な不調が続いている','健康面は問題ない','精神的な疲れを感じている']},
    {q:'時間をかけてじっくり育てているもの（関係・仕事・夢）がありますか？',templates:['長期的な目標に向けて取り組んでいる','人間関係をゆっくり築いている','結果が出ないことに焦りを感じる','特にそういったものはない']},
    {q:'過去の縁や昔からのつながりが今の状況に影響していると感じますか？',templates:['過去の縁が今も影響している','昔の関係が再浮上しそう','過去は区切りたい','特に思い当たらない']}
  ]},
  6:{card:'雲',qs:[
    {q:'今の状況が混乱していたり、先が見えにくいと感じますか？',templates:['状況がとても不透明','少し不安だが晴れてきた感じもある','混乱しているが整理しようとしている','特に混乱は感じない']},
    {q:'判断が難しく、どちらに進めばいいか迷っていることがありますか？',templates:['決断できずにいる','選択肢が多すぎて整理できていない','なんとなく方向性は見えている','決断はできているが不安がある']},
    {q:'相手の気持ちや状況が読めず、答えが見えないことがありますか？',templates:['相手の真意がわからない','情報が不足していて判断できない','時間が解決してくれると思っている','もう少し様子を見たい']}
  ]},
  7:{card:'蛇',qs:[
    {q:'嫉妬や裏切りを感じさせる人物が周囲にいますか？',templates:['思い当たる人がいる','少し警戒している人がいる','特に心当たりはない','自分の嫉妬心に気づいている']},
    {q:'今の状況に複雑な問題や絡み合った事情がありますか？',templates:['複雑な人間関係がある','三角関係や利害関係がある','シンプルな問題ではない','表面上は問題ないが内部が複雑']},
    {q:'誰かが本当のことを隠している、または巧妙に動いていると感じますか？',templates:['裏で何か動きがある気がする','情報を全て信じていない','自分が騙されているかもしれない','特に気になる動きはない']}
  ]},
  8:{card:'棺',qs:[
    {q:'何か大きなものが終わりを迎えつつあると感じますか？',templates:['関係・仕事・状況が終わりに向かっている','終わりを受け入れることが難しい','終わりの後に新しい始まりを期待している','まだ終わりとは思いたくない']},
    {q:'手放さなければならないものがあるとわかっていますか？',templates:['わかっているが手放せない','すでに手放す準備をしている','何を手放すべきか迷っている','手放す覚悟はできている']},
    {q:'健康面・体力・精神的な消耗について気になることがありますか？',templates:['最近体調に変化がある','精神的に消耗している','身体より心の疲れが大きい','今のところ体調は問題ない']}
  ]},
  9:{card:'花束',qs:[
    {q:'最近、誰かに感謝されたり褒められたりしましたか？',templates:['嬉しい言葉をもらった','認められる出来事があった','特にそういったことはなかった','自分から感謝を伝えた']},
    {q:'喜びや祝いごとが近いうちに訪れそうな予感がありますか？',templates:['なんとなくいい予感がする','お祝い事の予定がある','今はまだ先のことに感じる','特に期待していない']},
    {q:'誰かの魅力を引き出したり、感謝を伝えるような関わりをしていますか？',templates:['誰かのサポートをしている','相手の良さを引き出す立場にある','自分の魅力を発揮したい','人間関係より自分を磨きたい']}
  ]},
  10:{card:'鎌',qs:[
    {q:'突然の出来事や予期せぬ変化が起きそうな予感がありますか？',templates:['大きな変化の予感がある','すでに突然の出来事があった','なんとなく不安を感じている','特に変化を感じない']},
    {q:'思い切った決断や「断ち切る」選択を求められていますか？',templates:['決断すべき時だと感じている','何かを切り離す必要がある','決断を先送りにしてきた','まだ決断の時ではない']},
    {q:'過去や今の状況に区切りをつけたいと思っていますか？',templates:['区切りをつけたい','新しいスタートのために終わらせたい','なかなか区切れずにいる','まだその時ではない']}
  ]},
  11:{card:'鞭',qs:[
    {q:'繰り返す口論やトラブルが続いていますか？',templates:['同じ問題が繰り返されている','特定の人との衝突が続いている','摩擦はあるが表面化していない','今は関係が落ち着いている']},
    {q:'精神的・身体的なストレスを強く感じている時期ですか？',templates:['かなり疲弊している','ストレスが溜まってきている','なんとか対処できている','ストレスは少ない']},
    {q:'向上心を持って継続的に努力・練習を重ねていますか？',templates:['目標に向けて頑張っている','練習・トレーニングに励んでいる','努力しているが結果が出にくい','少し疲れて休みたい']}
  ]},
  12:{card:'鳥',qs:[
    {q:'誰かとの会話やSNSでのやりとりが気になっていますか？',templates:['特定の人とのやりとりが気になる','SNSでの反応が気になっている','重要な連絡がある','コミュニケーションに問題を感じている']},
    {q:'自分や周囲の噂・評判について気になることがありますか？',templates:['噂になっているかもしれない','評判や口コミが心配','良い噂が広まっている気がする','特に噂については考えていない']},
    {q:'特定の2人の関係（夫婦・カップル・ビジネスパートナー）が関係していますか？',templates:['パートナーとの関係が関係している','2人の問題について相談したい','ビジネスの共同関係が絡んでいる','特定の2人の問題ではない']}
  ]},
  13:{card:'子ども',qs:[
    {q:'何か新しいことを始めようとしていますか、または最近始めましたか？',templates:['新しいことを始めた','新しいスタートを考えている','始めたいが踏み出せていない','今は継続が大切']},
    {q:'自分や相手の未熟さや経験不足が影響していると感じますか？',templates:['経験不足を感じている','相手が少し幼い・未熟に感じる','自分の純粋さを取り戻したい','特に未熟さは感じない']},
    {q:'子どもや若い人との縁、または子供に関する話題が関係していますか？',templates:['子どもに関することがある','若い世代との関わりがある','自分の若い頃の感覚が戻ってきた','特に子供・若者との縁はない']}
  ]},
  14:{card:'キツネ',qs:[
    {q:'周囲に本音を隠していたり、表裏がある人物がいますか？',templates:['信用しきれない人がいる','自分の利益のために動いている人がいる','駆け引きをしている人物がいる','特に気になる人はいない']},
    {q:'「罠」や「落とし穴」に気をつけるべき状況がありますか？',templates:['警戒すべき状況がある','契約や取引で注意が必要','自分が誰かを誤解させていないか不安','特に警戒することはない']},
    {q:'目標達成のために戦略的に動いていますか？',templates:['計画的に動いている','もっと賢く立ち回りたい','正直か戦略的かで迷っている','戦略より誠実さを大切にしたい']}
  ]},
  15:{card:'熊',qs:[
    {q:'上司・親・権力のある人との関係で何か気になることがありますか？',templates:['上司・親との関係で悩んでいる','権力のある人物との関わりが影響している','良い後ろ盾・サポーターがいる','特に権力者との問題はない']},
    {q:'誰かに強く支配されていたり、過保護にされていると感じますか？',templates:['束縛や圧力を感じている','良い意味で守られている','自立したいと思っている','支配されているとは感じない']},
    {q:'財産・貯金・経済的な安定について気になっていますか？',templates:['お金の不安がある','財産・相続に関することがある','経済的に安定している','将来の経済的安定を考えている']}
  ]},
  16:{card:'星',qs:[
    {q:'今、明確な夢や理想・中長期のビジョンを持っていますか？',templates:['明確な夢・目標がある','漠然とした希望がある','夢を持てなくなっている','まだ方向性を整理中']},
    {q:'直感やひらめきから、進む方向の手がかりを感じることがありますか？',templates:['考えていると急に筋道が見えることがある','直感が鋭くなっている気がする','断片的なヒントがつながってきた','そういった感覚はあまりない']},
    {q:'現実的になりすぎて夢を諦めていたり、理想が高すぎると感じますか？',templates:['現実的になりすぎていた','理想が高すぎると感じている','夢と現実のバランスで迷っている','理想をしっかり持っていたい']}
  ]},
  17:{card:'コウノトリ',qs:[
    {q:'近いうちに引っ越し・転職など大きな環境の変化がありますか？',templates:['転居・引っ越しを予定している','転職・異動を考えている','新しいステージへの移行を感じている','今は変化の予定はない']},
    {q:'妊娠・出産・新しい命に関することが関係していますか？',templates:['妊娠・出産に関連することがある','新しい生命の誕生を期待している','このテーマではない','新しいプロジェクトの立ち上げかも']},
    {q:'古い習慣や過去のパターンから抜け出して進化したいと感じていますか？',templates:['変わりたいと強く思っている','すでに変化が始まっている','変化を恐れている部分がある','今は安定を求めている']}
  ]},
  18:{card:'犬',qs:[
    {q:'信頼できる友人やパートナーとの関係で何か変化を感じていますか？',templates:['大切な人との関係が変わってきた','友人・仲間の支えを感じている','信頼関係が試されている気がする','特に変化は感じない']},
    {q:'今の状況で、誰かに頼ったり・頼られていることがありますか？',templates:['誰かのサポートを必要としている','頼られている立場にいる','頼りたいが遠慮している','お互いに支え合っている']},
    {q:'忠実すぎる・依存しすぎていると感じることがありますか？',templates:['少し依存していると感じる','誰かに依存されて疲れている','信頼と依存のバランスを考えている','健全な関係が保てている']}
  ]},
  19:{card:'塔',qs:[
    {q:'大企業・公共機関・組織・法律などと関わることがありますか？',templates:['組織や機関との関わりがある','役所・病院・法律的な手続きがある','大きな組織の中で働いている','特にそういった機関との関わりはない']},
    {q:'今、孤独を感じていたり、周囲との距離を感じていますか？',templates:['孤立感を感じている','あえて距離を置いている','1人の時間を必要としている','人との距離がちょうどいい']},
    {q:'高い目標を1人で追っていたり、自立に向けて努力していますか？',templates:['独立・自立を目指している','1人で大きな目標に向かっている','周囲の助けなしに進んでいる','チームや仲間と共に進んでいる']}
  ]},
  20:{card:'庭園',qs:[
    {q:'人前での発表・イベント・パーティーなど公的な場に関することがありますか？',templates:['公の場でのイベントがある','SNSや人前での発信に関係している','パーティー・集まりへの参加予定がある','公的な場での失敗・問題が心配']},
    {q:'人脈・コミュニティ・グループ内での立ち位置が気になりますか？',templates:['グループ内での自分の位置が気になる','人脈を広げたいと思っている','コミュニティの中で問題が起きている','人間関係の輪を広げたい']},
    {q:'秘密にしていることが公になることへの不安がありますか？',templates:['知られたくないことがある','情報が漏れるかもしれない','公になってもいい','プライバシーに関わることがある']}
  ]},
  21:{card:'山',qs:[
    {q:'今、大きな壁や障害を感じていますか？何が邪魔していると感じますか？',templates:['人間関係の壁がある','経済的な障壁がある','自分の内側の恐れが壁になっている','外的な状況が障害になっている']},
    {q:'物事が予想より時間がかかっていたり、遅れを感じていますか？',templates:['かなり時間がかかっている','想定より遅れている','待ち続けることに疲れている','じっくり進むことを受け入れている']},
    {q:'この障害を越えるための方法や突破口をすでに考えていますか？',templates:['打開策を検討中','まだ解決策が見つかっていない','誰かの助けが必要','時間が解決してくれると思っている']}
  ]},
  22:{card:'道',qs:[
    {q:'今、どのような選択肢の間で迷っていますか？',templates:['2人の人物・関係の間で迷っている','転職か現状維持かで迷っている','進む方向・ルートを迷っている','まだ選択肢が明確でない']},
    {q:'選択を迫られているタイムリミットはありますか？',templates:['早めに決めなければならない','期限はあるが少し余裕がある','急ぐ必要はない','時間が解決してくれると思っている']},
    {q:'どちらの道を選んでも後悔しそうな気がしていますか？',templates:['どちらでも後悔しそう','一方は明らかにリスクがある','直感ではどちらかわかっている','後悔しないための情報が欲しい']}
  ]},
  23:{card:'ネズミ',qs:[
    {q:'エネルギーやお金・時間が少しずつ消耗している感覚がありますか？',templates:['じわじわ疲弊している','お金が思うように貯まらない','時間・エネルギーを奪われている','消耗の原因がわかっている']},
    {q:'自分のエネルギーを吸い取るような人物が周囲にいますか？',templates:['そういう人が思い当たる','知らず知らず消耗させられている','はっきりとはわからないが何か変','特に思い当たらない']},
    {q:'小さなトラブルが積み重なって大きくなっている気がしますか？',templates:['小さな問題が積み上がっている','見えないところで悪化しているかも','早めに対処しようとしている','まだそこまでではない']}
  ]},
  24:{card:'ハート',qs:[
    {q:'今、特定の人への愛情や恋愛感情が関係していますか？',templates:['特定の人への気持ちがある','恋愛の進展を期待している','感情をどう表現するか迷っている','恋愛より自分への愛を大切にしたい']},
    {q:'感情的になりすぎていたり、傷つきやすい状態ですか？',templates:['感情的になりやすい','感受性が高まっている気がする','傷つくことを恐れている','感情はコントロールできている']},
    {q:'告白・プロポーズなど気持ちを伝える具体的な行動を考えていますか？',templates:['気持ちを伝えることを考えている','行動したいが怖い','相手からのアクションを待っている','まだそこまでは考えていない']}
  ]},
  25:{card:'指輪',qs:[
    {q:'結婚・婚約・深いコミットメントに関することが関係していますか？',templates:['結婚・婚約の話がある','パートナーシップの約束を考えている','契約・誓いを結ぶことを検討している','まだその段階ではない']},
    {q:'繰り返すパターンや循環（同じことの繰り返し）を感じていますか？',templates:['同じパターンが繰り返される','ループから抜け出せない感覚がある','良い意味で継続できている','繰り返しに気づいていなかった']},
    {q:'束縛されている、または縛りつけている感覚がありますか？',templates:['自由を制限されている感じがする','相手を縛りすぎているかもしれない','約束が重荷になっている','お互いの絆として受け入れている']}
  ]},
  26:{card:'本',qs:[
    {q:'相手や状況について、まだ知らないことや隠されていると感じますか？',templates:['何か隠されている気がする','真実をまだ全て知らないと思う','知らなくていいこともあると思う','もっと情報が必要']},
    {q:'秘密にしていることが今の状況に影響していますか？',templates:['自分が秘密にしていることがある','相手が何かを隠している','秘密が関係にひびを入れている','秘密を明かす時期が来ている']},
    {q:'学び・勉強・資格取得など知識に関することが関係していますか？',templates:['勉強・資格取得に取り組んでいる','情報収集が大切な時期にある','専門知識を活かすチャンスがある','学びより実践を重視している']}
  ]},
  27:{card:'手紙',qs:[
    {q:'重要なメッセージや書類、連絡を待っていますか？',templates:['大切な連絡を待っている','重要な書類・手続きが進行中','合否・審査結果を待っている','特に待っている連絡はない']},
    {q:'誰かに連絡を取りたいが取れていない・または迷っている状況がありますか？',templates:['連絡したいが踏み出せない','返信すべきメッセージがある','連絡を無視している・されている','コミュニケーションがうまくいっていない']},
    {q:'契約書・証明書・公式な書類に関することが関係していますか？',templates:['重要な書類の手続きがある','契約・署名に関することがある','書類上の問題が起きている','特に書類関係のことはない']}
  ]},
  28:{card:'紳士',qs:[
    {q:'今の相談において、重要な男性（パートナー・上司・父親等）が関係していますか？',templates:['特定の男性が深く関係している','男性との関係が悩みの中心','頼りにしている男性がいる','特定の男性は関係していない']},
    {q:'その男性の立場・関係はどれに近いですか？',templates:['パートナー・恋人','仕事上の上司・同僚','家族（父・兄弟）','友人・知人']},
    {q:'その男性との関係において、何を最も知りたいですか？',templates:['相手の気持ち・本音が知りたい','関係の行方・将来を知りたい','どう接すれば良いか知りたい','関係性が変わった理由が知りたい']}
  ]},
  29:{card:'淑女',qs:[
    {q:'今の相談において、重要な女性（パートナー・上司・母親等）が関係していますか？',templates:['特定の女性が深く関係している','女性との関係が悩みの中心','頼りにしている女性がいる','特定の女性は関係していない']},
    {q:'その女性の立場・関係はどれに近いですか？',templates:['パートナー・恋人','仕事上の上司・同僚','家族（母・姉妹）','友人・知人']},
    {q:'その女性との関係において、何を最も知りたいですか？',templates:['相手の気持ち・本音が知りたい','関係の行方・将来を知りたい','どう接すれば良いか知りたい','関係性が変わった理由が知りたい']}
  ]},
  30:{card:'百合',qs:[
    {q:'年上の人や長年の関係にある人との縁が関係していますか？',templates:['年上の方との縁がある','長年続いている関係について相談したい','師匠・メンター的な人物がいる','年配の家族との関係がある']},
    {q:'今の状況に平和・癒し・調和が必要と感じていますか？',templates:['心の平和を求めている','関係を穏やかにしたい','対立や緊張を和らげたい','今は平和な状態にある']},
    {q:'成熟した愛や長年のパートナーシップに関することが関係していますか？',templates:['成熟した愛の在り方を考えている','長年の関係の変化について相談したい','深い信頼関係を求めている','この部分はスキップしたい']}
  ]},
  31:{card:'太陽',qs:[
    {q:'今、自信や活力・ポジティブなエネルギーに満ちていますか？',templates:['とても前向き・活力がある','以前より元気になってきた','表面は明るくしているが内側は疲れている','今はエネルギーが低下気味']},
    {q:'大きな成功・達成が目前だと感じますか？',templates:['目標達成が近い感じがする','努力が実りそうな予感がある','もう少しで結果が出そう','まだ道のりが長い']},
    {q:'周囲を明るく照らしたり、リーダーシップを発揮する立場にいますか？',templates:['周囲を引っ張る立場にある','人を元気づける役割をしている','注目される・目立つ立場にある','今は裏方・サポート役でいたい']}
  ]},
  32:{card:'月',qs:[
    {q:'直感や夢・感情の波が今の状況に大きく影響していますか？',templates:['感情の波が激しい','直感が冴えている時期','夢や無意識のメッセージが気になる','論理より感覚で動いている']},
    {q:'評判・名誉・イメージに関することが関係していますか？',templates:['自分の評判が気になっている','周囲からの印象・イメージを意識している','名誉に関わることがある','評判より実力を重視したい']},
    {q:'感受性が特に高まっていたり、感情の揺れを感じていますか？',templates:['感受性がとても豊かな時期','夜に考え込むことが多い','感覚が敏感で影響を受けやすい','特にそういった感覚はない']}
  ]},
  33:{card:'鍵',qs:[
    {q:'今の状況において「重要な突破口となること」に気づいていますか？',templates:['何かが突破口になりそう','解決策を探している','重要な選択・決断が近い','まだ答えが見えていない']},
    {q:'偶然とは思えないほど意味の大きい出来事や出会いがありましたか？',templates:['意味の大きい出来事があった','印象に残る出会いがあった','今がターニングポイントだと感じる','まだそこまでは感じていない']},
    {q:'長い間悩んでいた問題に、ついに解決の糸口が見え始めていますか？',templates:['解決の糸口が見えてきた','急に物事が動き始めた感覚がある','まだ解決策が見つかっていない','扉が開く直前の感覚がある']}
  ]},
  34:{card:'魚',qs:[
    {q:'お金・財産・ビジネスに関することが主な相談内容ですか？',templates:['金銭的なことが主な悩み','ビジネス・収入に関する相談','独立・フリーランスを考えている','財政的な不安がある']},
    {q:'お金や物が「流れていく」または「流れてくる」感覚がありますか？',templates:['お金が出ていく一方という感覚','収入の流れが良くなってきた','お金の流れを変えたい','豊かさが巡ってきそうな予感']},
    {q:'経済的自立・独立についての意欲や不安がありますか？',templates:['自立・独立を真剣に考えている','収入を増やしたい','経済的な不安定さが心配','今の収入で満足している']}
  ]},
  35:{card:'錨',qs:[
    {q:'今の仕事・職場・長期的なキャリアについて気になることがありますか？',templates:['仕事の安定に不安がある','長期的なキャリアを見直したい','今の仕事を続けるべきか迷っている','仕事面は安定している']},
    {q:'ひとつのことに長く執着・固執しすぎていると感じますか？',templates:['変化できずにいる','手放せずに引きずっているものがある','安定を求めすぎて停滞している','安定と執着のバランスを考えている']},
    {q:'今の状況に「安心感」を感じていますか、それとも「停滞感」を感じていますか？',templates:['安定・安心を感じている','停滞・変化できない感覚がある','どちらともとれる状況','安定を求めて努力している']}
  ]},
  36:{card:'十字架',qs:[
    {q:'今の状況が「避けて通れない課題」や「大きな責任」に関係していますか？',templates:['責任の重さを感じている','簡単に先延ばしできない課題がある','長く向き合うべきテーマだと感じる','義務・責任として受け入れている']},
    {q:'重い責任や試練を1人で背負っていると感じますか？',templates:['かなりの重荷を感じている','誰にも言えない苦しみがある','試練の中にいると感じている','重荷を下ろしたいと思っている']},
    {q:'長く繰り返してきたパターンや、手放しきれていない課題を感じることがありますか？',templates:['同じパターンが繰り返されている','家族や環境の影響を感じる','過去から続く課題を整理したい','特に繰り返しは感じていない']}
  ]},
};

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded',()=>{
  safeRun('installGlobalClientLogging',()=>installGlobalClientLogging());
  safeRun('bootMemberMode',()=>bootMemberMode());
  safeRun('renderBrandLayer',()=>renderBrandLayer());
  safeRun('buildStars',()=>buildStars());
  safeRun('buildDateSelects',()=>buildDateSelects());
  safeRun('repairStaticCopy',()=>repairStaticCopy());
  safeRun('loadSaved',()=>loadSaved());
  safeRun('loadApiKey',()=>loadApiKey());
  safeRun('loadServerHealth',()=>loadServerHealth().then(()=>handleStripeReturnFlow()).finally(()=>runRequestedFlowFromQuery()));
  safeRun('loadSolarTermBoundaries',()=>loadSolarTermBoundaries());
  safeRun('renderHomeVault',()=>renderHomeVault());
  safeRun('runAutotestFromQuery',()=>runAutotestFromQuery());
});

document.addEventListener('click',event=>{
  const target=event.target&&typeof event.target.closest==='function'
    ? event.target
    : event.target?.parentElement||null;
  const flowBtn=target?.closest?.('[data-flow-target]');
  if(flowBtn){
    event.preventDefault();
    const plan=String(flowBtn.getAttribute('data-flow-target')||'').trim();
    if(plan) void startFlow(plan);
    return;
  }
  const memberBtn=target?.closest?.('[data-member-intent]');
  if(memberBtn){
    event.preventDefault();
    const intent=String(memberBtn.getAttribute('data-member-intent')||'start-paid').trim()||'start-paid';
    openMemberAccessModal(intent);
  }
});

function safeRun(label,fn,fallback){
  try{
    return fn();
  }catch(error){
    console.error(`[uranai] ${label} failed`,error);
    sendClientLog({
      type:'safeRun',
      level:'error',
      message:`${label} failed: ${error?.message||String(error)}`,
      stack:error?.stack||'',
      source:label,
    });
    if(typeof fallback==='function'){
      try{
        return fallback(error);
      }catch(fallbackError){
        console.error(`[uranai] ${label} fallback failed`,fallbackError);
        sendClientLog({
          type:'safeRun.fallback',
          level:'error',
          message:`${label} fallback failed: ${fallbackError?.message||String(fallbackError)}`,
          stack:fallbackError?.stack||'',
          source:label,
        });
      }
    }
  }
  return null;
}

function runAutotestFromQuery(){
  const mode=new URLSearchParams(window.location.search).get('autotest');
  if(mode!=='buttons') return;
  window.setTimeout(()=>{
    void runButtonsAutotest();
  },400);
}

let FLOW_QUERY_CONSUMED=false;
function runRequestedFlowFromQuery(){
  if(FLOW_QUERY_CONSUMED) return;
  const params=new URLSearchParams(window.location.search);
  const plan=String(params.get('flow')||'').trim().toLowerCase();
  if(plan!=='free'&&plan!=='paid') return;
  FLOW_QUERY_CONSUMED=true;
  params.delete('flow');
  const nextQuery=params.toString();
  const nextUrl=`${window.location.pathname}${nextQuery?`?${nextQuery}`:''}${window.location.hash||''}`;
  if(window.history&&typeof window.history.replaceState==='function'){
    window.history.replaceState({},'',nextUrl);
  }
  window.setTimeout(()=>{
    void startFlow(plan);
  },0);
}

function publishAutotestResult(payload){
  let node=document.getElementById('autotest-result');
  if(!node){
    node=document.createElement('script');
    node.id='autotest-result';
    node.type='application/json';
    document.body.appendChild(node);
  }
  node.textContent=JSON.stringify(payload);
}

async function runButtonsAutotest(){
  const result={
    ok:false,
    timestamp:new Date().toISOString(),
    initial:{},
    steps:[],
    final:{},
  };
  const captureState=()=>({
    activeScreens:[...document.querySelectorAll('.screen.active')].map(node=>node.id),
    progressWidth:document.getElementById('progress')?.style.width||'',
    modalOn:document.getElementById('member-access-modal')?.classList.contains('on')||false,
  });
  const waitFor=async(check,timeoutMs=2500)=>{
    const started=Date.now();
    while(Date.now()-started<timeoutMs){
      let passed=false;
      try{ passed=!!check(); }catch(_error){}
      if(passed) return true;
      await new Promise(resolve=>window.setTimeout(resolve,100));
    }
    return false;
  };
  try{
    result.initial={
      topPaid:!!document.querySelector('.btn-top.btn-paid'),
      topFree:!!document.querySelector('.btn-top.btn-free'),
      bottomPrimary:!!document.querySelector('#premium-entry .today-cta'),
      bottomFree:!!document.querySelector('#premium-entry .premium-entry-subbtn'),
      hasStartFlow:typeof window.startFlow,
      hasOpenMemberAccessModal:typeof window.openMemberAccessModal,
      state:captureState(),
    };

    const topFreeBtn=document.querySelector('.btn-top.btn-free');
    if(topFreeBtn){
      topFreeBtn.click();
      const passed=await waitFor(()=>document.getElementById('s-input')?.classList.contains('active'));
      result.steps.push({label:'topFree',passed,state:captureState()});
    }else{
      result.steps.push({label:'topFree',passed:false,reason:'button-missing'});
    }

    if(typeof window.gotoTop==='function') window.gotoTop();

    const topPaidBtn=document.querySelector('.btn-top.btn-paid');
    if(topPaidBtn){
      topPaidBtn.click();
      const passed=await waitFor(()=>{
        return document.getElementById('s-input')?.classList.contains('active')
          || document.getElementById('member-access-modal')?.classList.contains('on');
      });
      result.steps.push({label:'topPaid',passed,state:captureState()});
    }else{
      result.steps.push({label:'topPaid',passed:false,reason:'button-missing'});
    }

    if(typeof window.gotoTop==='function') window.gotoTop();

    const bottomFreeBtn=document.querySelector('#premium-entry .premium-entry-subbtn');
    if(bottomFreeBtn){
      bottomFreeBtn.click();
      const passed=await waitFor(()=>document.getElementById('s-input')?.classList.contains('active'));
      result.steps.push({label:'bottomFree',passed,state:captureState()});
    }else{
      result.steps.push({label:'bottomFree',passed:false,reason:'button-missing'});
    }

    if(typeof window.gotoTop==='function') window.gotoTop();

    const bottomPrimaryBtn=document.querySelector('#premium-entry .today-cta');
    if(bottomPrimaryBtn){
      bottomPrimaryBtn.click();
      const passed=await waitFor(()=>{
        return document.getElementById('s-input')?.classList.contains('active')
          || document.getElementById('member-access-modal')?.classList.contains('on');
      });
      result.steps.push({label:'bottomPrimary',passed,state:captureState()});
    }else{
      result.steps.push({label:'bottomPrimary',passed:false,reason:'button-missing'});
    }

    result.final=captureState();
    result.ok=result.steps.every(step=>step.passed);
  }catch(error){
    result.error=error?.message||String(error);
    result.stack=error?.stack||'';
  }
  publishAutotestResult(result);
}

async function loadSolarTermBoundaries(){
  try{
    const res=await fetch('solar-term-boundaries.json',{cache:'force-cache'});
    if(!res.ok) return;
    SOLAR_TERM_BOUNDARIES=await res.json();
    SOLAR_TERM_DATA_READY=true;
  }catch(e){}
}

function buildStars(){
  const sf=document.getElementById('starfield');
  for(let i=0;i<120;i++){
    const s=document.createElement('div');
    s.className='star';
    const sz=Math.random()*2+.5;
    s.style.cssText=`
      left:${Math.random()*100}%;top:${Math.random()*100}%;
      width:${sz}px;height:${sz}px;
      --d:${(Math.random()*4+2).toFixed(1)}s;
      --delay:-${(Math.random()*5).toFixed(1)}s;
      --min-op:${(Math.random()*.15).toFixed(2)};
      --max-op:${(Math.random()*.6+.3).toFixed(2)};
    `;
    sf.appendChild(s);
  }
}

function buildDateSelects(){
  const ysel=document.getElementById('f-year');
  for(let y=new Date().getFullYear();y>=1920;y--){
    const o=document.createElement('option');
    o.value=y;o.textContent=y+'年';
    if(y===1990)o.selected=true;
    ysel.appendChild(o);
  }
  const msel=document.getElementById('f-month');
  for(let m=1;m<=12;m++){
    const o=document.createElement('option');
    o.value=m;o.textContent=m+'月';
    if(m===6)o.selected=true;
    msel.appendChild(o);
  }
  const hsel=document.getElementById('f-hour');
  hsel.innerHTML='<option value="unknown">わからない（幅を持たせて読みます）</option>';
  for(let h=0;h<24;h++){
    const o=document.createElement('option');
    o.value=h;o.textContent=`${h.toString().padStart(2,'0')}:00`;
    hsel.appendChild(o);
  }
  syncDayOptions(15);
  ysel.addEventListener('change',()=>syncDayOptions());
  msel.addEventListener('change',()=>syncDayOptions());
}

function syncDayOptions(preferredDay){
  const ysel=document.getElementById('f-year');
  const msel=document.getElementById('f-month');
  const dsel=document.getElementById('f-day');
  if(!ysel||!msel||!dsel) return;
  const year=parseInt(ysel.value,10)||1990;
  const month=parseInt(msel.value,10)||1;
  const currentDay=preferredDay===undefined?getSelectedBirthDay():preferredDay;
  const maxDay=new Date(year,month,0).getDate();
  dsel.innerHTML='';
  const unknown=document.createElement('option');
  unknown.value='unknown';
  unknown.textContent='不明';
  if(!Number.isFinite(currentDay)) unknown.selected=true;
  dsel.appendChild(unknown);
  for(let d=1;d<=maxDay;d++){
    const o=document.createElement('option');
    o.value=d;
    o.textContent=d+'日';
    if(Number.isFinite(currentDay)&&d===Math.min(currentDay,maxDay)) o.selected=true;
    dsel.appendChild(o);
  }
}

function getSelectedBirthDay(){
  const raw=document.getElementById('f-day')?.value;
  if(raw===undefined||raw===null||raw===''||raw==='unknown') return null;
  const day=parseInt(raw,10);
  return Number.isFinite(day)?day:null;
}

function getSelectedBirthHour(){
  const raw=document.getElementById('f-hour')?.value;
  if(raw===undefined||raw===null||raw===''||raw==='unknown') return null;
  const hour=parseInt(raw,10);
  return Number.isFinite(hour)?hour:null;
}

function hasBirthYearMonth(y,m){
  return Number.isFinite(y)&&Number.isFinite(m)&&m>=1&&m<=12;
}

function isValidBirthDate(y,m,d){
  if(!Number.isFinite(y)||!Number.isFinite(m)||!Number.isFinite(d)) return false;
  const dt=new Date(y,m-1,d);
  return dt.getFullYear()===y&&dt.getMonth()===(m-1)&&dt.getDate()===d;
}

function hasFullBirthDate(y,m,d){
  return hasBirthYearMonth(y,m)&&isValidBirthDate(y,m,d);
}

function getReactionQuestion(id){
  return REACTION_QUESTION_BANK[id]||null;
}

function getReactionChoice(questionId,optionId){
  return getReactionQuestion(questionId)?.options?.find(option=>option.id===optionId)||null;
}

function getReactionScores(answers=REACTION_ANSWERS){
  const scores={drive:0,connection:0,autonomy:0,ideal:0};
  ['stress_play','stress_rule'].forEach(questionId=>{
    const choice=getReactionChoice(questionId,answers?.[questionId]);
    if(choice?.axis) scores[choice.axis]+=1;
  });
  return scores;
}

function getDominantReactionAxis(answers=REACTION_ANSWERS){
  const scores=getReactionScores(answers);
  const firstAxis=getReactionChoice('stress_play',answers?.stress_play)?.axis||'drive';
  const order=['drive','connection','autonomy','ideal'];
  let bestAxis=firstAxis;
  let bestScore=-1;
  order.forEach(axis=>{
    const score=scores[axis]||0;
    if(score>bestScore){
      bestAxis=axis;
      bestScore=score;
      return;
    }
    if(score===bestScore&&axis===firstAxis){
      bestAxis=axis;
    }
  });
  return bestScore<=0?'':bestAxis;
}

function getReactionCurrentQuestionId(answers=REACTION_ANSWERS){
  if(!answers.stress_play) return 'stress_play';
  if(!answers.stress_rule) return 'stress_rule';
  const axis=getDominantReactionAxis(answers);
  if(axis==='drive') return answers.drive_style?'' :'drive_style';
  if(axis==='connection') return answers.connection_style?'' :'connection_style';
  if(axis==='autonomy') return answers.autonomy_style?'' :'autonomy_style';
  if(axis==='ideal'){
    if(!answers.ideal_focus) return 'ideal_focus';
    if(answers.ideal_focus==='person') return answers.ideal_person_distance?'' :'ideal_person_distance';
    if(answers.ideal_focus==='work'){
      if(!answers.ideal_work_priority) return 'ideal_work_priority';
      return answers.ideal_work_distance?'' :'ideal_work_distance';
    }
    if(answers.ideal_focus==='style'){
      if(!answers.ideal_style_direction) return 'ideal_style_direction';
      return answers.ideal_style_tone?'' :'ideal_style_tone';
    }
  }
  return '';
}

function isReactionComplete(answers=REACTION_ANSWERS){
  return !!getReactionResultKey(answers);
}

function getReactionResultKey(answers=REACTION_ANSWERS){
  const axis=getDominantReactionAxis(answers);
  if(!axis) return '';
  if(axis==='drive'){
    if(answers.drive_style==='direct') return 'drive_direct';
    if(answers.drive_style==='strategic') return 'drive_strategic';
    return '';
  }
  if(axis==='connection'){
    if(answers.connection_style==='broad') return 'connection_broad';
    if(answers.connection_style==='deep') return 'connection_deep';
    return '';
  }
  if(axis==='autonomy'){
    if(answers.autonomy_style==='observe') return 'autonomy_observe';
    if(answers.autonomy_style==='dive') return 'autonomy_dive';
    return '';
  }
  if(axis==='ideal'){
    if(answers.ideal_focus==='person'){
      if(answers.ideal_person_distance==='forward') return 'ideal_person_forward';
      if(answers.ideal_person_distance==='conflicted') return 'ideal_person_conflicted';
      return '';
    }
    if(answers.ideal_focus==='work'){
      if(!answers.ideal_work_priority||!answers.ideal_work_distance) return '';
      return `ideal_work_${answers.ideal_work_priority}_${answers.ideal_work_distance}`;
    }
    if(answers.ideal_focus==='style'){
      if(!answers.ideal_style_direction||!answers.ideal_style_tone) return '';
      return `ideal_style_${answers.ideal_style_direction}_${answers.ideal_style_tone}`;
    }
  }
  return '';
}

function buildReactionEvidence(answers=REACTION_ANSWERS){
  return Object.entries(answers).map(([questionId,optionId])=>getReactionChoice(questionId,optionId)?.label).filter(Boolean);
}

function buildReactionProfile(answers=REACTION_ANSWERS){
  const key=getReactionResultKey(answers);
  if(!key||!REACTION_PROFILE_DEFS[key]) return null;
  const base=REACTION_PROFILE_DEFS[key];
  return{
    key,
    axis:getDominantReactionAxis(answers),
    summary:base.summary,
    stress:base.stress,
    power:base.power,
    handling:base.handling,
    tags:[...(base.tags||[])],
    evidence:buildReactionEvidence(answers),
  };
}

function getReactionTotalSteps(answers=REACTION_ANSWERS){
  if(!answers.stress_play||!answers.stress_rule) return 3;
  const axis=getDominantReactionAxis(answers);
  if(axis!=='ideal') return 3;
  if(answers.ideal_focus==='work'||answers.ideal_focus==='style') return 5;
  return 4;
}

function getReactionInterimCopy(answers=REACTION_ANSWERS){
  if(!answers.stress_play||!answers.stress_rule) return 'イラッとしやすい場面に近い方を選ぶと、結果が安定します。';
  return REACTION_AXIS_HINTS[getDominantReactionAxis(answers)]||'';
}

function getReactionAnswersSnapshot(){
  return JSON.parse(JSON.stringify(REACTION_ANSWERS||{}));
}

function setReactionAnswers(answers={},profile=null){
  REACTION_ANSWERS=JSON.parse(JSON.stringify(answers||{}));
  REACTION_PROFILE=buildReactionProfile(REACTION_ANSWERS)||profile||null;
  renderReactionQuestionnaire();
}

function resetReactionFlow(showMessage=false){
  REACTION_ANSWERS={};
  REACTION_PROFILE=null;
  renderReactionQuestionnaire();
  if(showMessage) showToast('魂の本質診断の回答をリセットしました');
}

function chooseReactionOption(optionId){
  const questionId=getReactionCurrentQuestionId(REACTION_ANSWERS);
  if(!questionId) return;
  REACTION_ANSWERS={...REACTION_ANSWERS,[questionId]:optionId};
  REACTION_PROFILE=buildReactionProfile(REACTION_ANSWERS);
  renderReactionQuestionnaire();
}

function renderReactionQuestionnaire(){
  const progressEl=document.getElementById('reaction-progress');
  const progressFillEl=document.getElementById('reaction-progress-fill');
  const questionEl=document.getElementById('reaction-question');
  const choicesEl=document.getElementById('reaction-choices');
  const summaryEl=document.getElementById('reaction-summary');
  if(!progressEl||!questionEl||!choicesEl||!summaryEl) return;

  const currentId=getReactionCurrentQuestionId(REACTION_ANSWERS);
  const answeredCount=Object.keys(REACTION_ANSWERS).length;
  const totalSteps=getReactionTotalSteps(REACTION_ANSWERS);
  const progressRatio=Math.max(0,Math.min(1,totalSteps?answeredCount/totalSteps:0));

  if(!currentId&&REACTION_PROFILE){
    progressEl.textContent='魂の本質診断の結果がまとまりました';
    if(progressFillEl) progressFillEl.style.width='100%';
    questionEl.textContent='結果に反映する補足メモを準備しました';
    choicesEl.innerHTML='';
    summaryEl.textContent='この内容は鑑定文の中で、ストレスの出やすい場面や力の出し方の説明として自然に反映されます。';
    return;
  }

  const question=getReactionQuestion(currentId);
  if(!question){
    progressEl.textContent='魂の本質診断';
    if(progressFillEl) progressFillEl.style.width='0%';
    questionEl.textContent='このセクションを読み込めませんでした。';
    choicesEl.innerHTML='';
    summaryEl.textContent='時間をおいてから再度お試しください。';
    return;
  }

  progressEl.textContent=`魂の本質診断 ${Math.min(answeredCount+1,totalSteps)} / ${totalSteps}`;
  if(progressFillEl){
    const nextRatio=Math.max(progressRatio,(Math.min(answeredCount+1,totalSteps)/Math.max(totalSteps,1))*0.92);
    progressFillEl.style.width=`${Math.max(8,Math.round(nextRatio*100))}%`;
  }
  questionEl.textContent=question.prompt;
  choicesEl.innerHTML=question.options.map(option=>`
    <button class="reaction-choice" type="button" onclick="chooseReactionOption('${option.id}')">${escapeHtml(option.label)}</button>
  `).join('');
  summaryEl.innerHTML=escapeHtml(getReactionInterimCopy(REACTION_ANSWERS));
}

function hydrateReactionInput(saved={}){
  const answers=saved?.reactionAnswers;
  const profile=saved?.reactionProfile||null;
  if(answers&&typeof answers==='object'&&Object.keys(answers).length){
    setReactionAnswers(answers,profile);
    return;
  }
  if(profile){
    setReactionAnswers({},profile);
    return;
  }
  resetReactionFlow();
}

function applySampleReactionAnswers(){
  setReactionAnswers({
    stress_play:'win_break',
    stress_rule:'lose_efficiency',
    drive_style:'direct',
  });
}

function buildReactionPromptSnippet(profile=REACTION_PROFILE){
  if(!profile) return '魂の本質診断：未入力';
  return [
    '魂の本質診断',
    `要約：${profile.summary}`,
    `反応が出やすい場面：${profile.stress}`,
    `力が出やすい動き：${profile.power}`,
    `扱い方のメモ：${profile.handling}`,
    profile.evidence?.length?`魂の本質診断の回答：${profile.evidence.join(' / ')}`:'',
  ].filter(Boolean).join(' / ');
}

function syncCheckSaveUI(){
  const box=document.getElementById('check-save');
  if(box) box.classList.toggle('checked',checkSave);
}

function hasStoredInputData(saved){
  return !!(saved&&(
    saved.fullname||
    saved.year||
    saved.month||
    saved.day!==undefined||
    saved.hour!==undefined||
    saved.theme||
    saved.cat||
    (saved.reactionAnswers&&Object.keys(saved.reactionAnswers).length)
  ));
}

function resetInputFields(){
  const fullnameEl=document.getElementById('f-fullname');
  const themeEl=document.getElementById('f-theme');
  if(fullnameEl) fullnameEl.value='';
  if(themeEl) themeEl.value='';
  setGender('female');
  const yearEl=document.getElementById('f-year');
  const monthEl=document.getElementById('f-month');
  const hourEl=document.getElementById('f-hour');
  const catEl=document.getElementById('f-cat');
  if(yearEl) yearEl.value='1990';
  if(monthEl) monthEl.value='6';
  syncDayOptions(null);
  const dayEl=document.getElementById('f-day');
  if(dayEl) dayEl.value='unknown';
  if(hourEl) hourEl.value='unknown';
  if(catEl) catEl.value='総合';
  resetReactionFlow();
}

function loadSaved(){
  try{
    const saved=JSON.parse(localStorage.getItem(INPUT_STORAGE_KEY)||'{}');
    const prefRaw=localStorage.getItem(INPUT_SAVE_PREF_KEY);
    checkSave=prefRaw===null?hasStoredInputData(saved):prefRaw==='1';
    syncCheckSaveUI();
    if(!checkSave){
      resetReactionFlow();
      return;
    }
    if(saved.fullname) document.getElementById('f-fullname').value=saved.fullname;
    if(saved.gender) setGender(saved.gender);
    if(saved.year) document.getElementById('f-year').value=saved.year;
    if(saved.month) document.getElementById('f-month').value=saved.month;
    syncDayOptions(saved.day??null);
    document.getElementById('f-day').value=saved.day==null?'unknown':String(saved.day);
    if(saved.hour!==undefined&&saved.hour!==null) document.getElementById('f-hour').value=String(saved.hour);
    if(saved.cat) document.getElementById('f-cat').value=saved.cat;
    if(saved.theme!==undefined) document.getElementById('f-theme').value=saved.theme;
    hydrateReactionInput(saved);
    return;
  }catch(e){}
  resetReactionFlow();
}

function bootMemberMode(){
  try{
    if(canUsePaidTestMode()&&MEMBER_PREVIEW_PARAM) localStorage.setItem(MEMBER_STORAGE_KEY,'1');
    MEMBER_MODE=canUsePaidTestMode()&&localStorage.getItem(MEMBER_STORAGE_KEY)==='1';
  }catch(e){
    MEMBER_MODE=canUsePaidTestMode()&&MEMBER_PREVIEW_PARAM;
  }
}

function canUsePaidTestMode(){
  return LOCAL_TEST_RUNTIME||!!RUNTIME_HEALTH.paidTestMode||!!MEMBER_AUTH.localTestMode;
}

function rememberMemberPreview(enabled){
  try{
    localStorage.setItem(MEMBER_STORAGE_KEY,enabled?'1':'0');
  }catch(e){}
  MEMBER_MODE=!!enabled;
}

function formatMemberDate(iso){
  if(!iso) return'';
  const dt=new Date(iso);
  if(Number.isNaN(dt.getTime())) return'';
  try{
    return dt.toLocaleDateString('ja-JP');
  }catch(e){
    return'';
  }
}

function getServerErrorMessage(data,fallback='処理に失敗しました'){
  const code=String(data?.error||'').trim();
  const message=String(data?.message||'').trim();
  if(code==='ACCESS_CODE_INVALID') return'認証コードが一致しませんでした';
  if(code==='ACCESS_CODE_DISABLED') return'サーバー側に認証コードが設定されていません';
  if(code==='LOCAL_ONLY_MEMBER_PREVIEW') return'ローカル試験セッションは localhost からのみ発行できます';
  if(code==='ACCESS_CODE_REQUIRED') return'認証コードを入力してください';
  if(code==='GOOGLE_CLIENT_ID_MISSING') return'Googleログインが未設定です';
  if(code==='GOOGLE_PROFILE_INVALID') return'Googleアカウント情報を確認できませんでした';
  if(code==='GOOGLE_AUTH_FAILED'||code.startsWith('GOOGLE_')) return'Googleログインを確認できませんでした';
  if(code==='DEVELOPER_LOCAL_ONLY') return'開発者用はローカルだけです';
  if(code==='DEVELOPER_EMAIL_REQUIRED') return'開発者メールを入れてください';
  if(code==='DEVELOPER_EMAIL_DENIED') return'このメールでは開発者ログインできません';
  if(code==='AUTH_REQUIRED'||code==='STRIPE_PORTAL_AUTH_REQUIRED'||code==='PAID_AUTH_REQUIRED') return'Googleでログインし、会員登録を完了してください';
  if(code==='PAID_SESSION_REQUIRED') return'有料版の試験にはローカル試験セッションが必要です';
  if(code==='STRIPE_NOT_CONFIGURED') return'Stripeがまだ設定されていません';
  if(code==='STRIPE_CUSTOMER_NOT_FOUND') return'Stripeの顧客情報がまだ作成されていません';
  if(code==='STRIPE_SUBSCRIPTION_NOT_ACTIVE') return'決済は完了しましたが、会員状態への反映がまだ終わっていません';
  if(code==='SESSION_ID_REQUIRED') return'決済確認に必要な情報が不足しています';
  if(message) return message;
  return fallback;
}

function getMemberStatusMeta(){
  if(isMemberActive()){
    const portalBtn=MEMBER_AUTH.manageBillingAvailable
      ?`<button class="vault-link" onclick="openStripeBillingPortal()">請求管理</button>`
      :'';
    const label=MEMBER_AUTH.source==='developer'
      ?'開発者権限で利用中'
      :(MEMBER_AUTH.source==='local_preview'
        ?'ローカル試験セッション有効'
        :(MEMBER_AUTH.source==='stripe'
          ?'Stripe会員登録済み'
          :(MEMBER_AUTH.source==='access_code'?'認証コードで利用中':'会員セッション有効')));
    const periodLabel=MEMBER_AUTH.currentPeriodEnd?`次回更新予定: ${formatMemberDate(MEMBER_AUTH.currentPeriodEnd)}`:'';
    const cancelLabel=MEMBER_AUTH.cancelAtPeriodEnd?'期間終了で解約予定です。':'';
    const copy=MEMBER_AUTH.source==='developer'
      ?'このGoogleアカウントは開発者として登録されています。Stripe契約がなくても、有料鑑定と追加質問をいつでも検証できます。'
      :(MEMBER_AUTH.source==='local_preview'
        ?'この端末ではローカル試験セッションが有効です。公開前の有料導線をそのまま検証できます。'
        :(MEMBER_AUTH.source==='stripe'
          ?['GoogleログインとStripeの契約状態が確認できています。',periodLabel,cancelLabel].filter(Boolean).join(' ')
          :'会員セッションが有効です。今回の結果を土台に、深掘りや追加質問へ進めます。'));
    return{
      cls:'active',
      label,
      copy,
      action:`<div style="display:flex;gap:10px;flex-wrap:wrap;"><button class="vault-link" onclick="startFlow('paid')">深掘り鑑定へ進む</button>${portalBtn}<button class="vault-link" onclick="logoutMemberSession()">${MEMBER_AUTH.source==='local_preview'?'試験セッションを終了':'ログアウト'}</button></div>`,
    };
  }
  if(canUsePaidTestMode()){
    return{
      cls:'inactive',
      label:'ローカル試験待機中',
      copy:'この端末ではローカル試験セッションを発行して、有料導線を検証できます。',
      action:`<button class="vault-link" onclick="toggleMemberPreview()">ローカル試験を開始</button>`,
    };
  }
  if(MEMBER_AUTH.manageBillingAvailable){
    return{
      cls:'inactive',
      label:'請求管理のみ利用可能',
      copy:'Googleログイン済みです。契約状態の確認や解約はStripeの請求管理から行えます。',
      action:`<div style="display:flex;gap:10px;flex-wrap:wrap;"><button class="vault-link" onclick="openStripeBillingPortal()">請求管理</button><button class="vault-link" onclick="logoutMemberSession()">ログアウト</button></div>`,
    };
  }
  if(MEMBER_AUTH.googleClientConfigured&&!MEMBER_AUTH.authLoggedIn){
    return{
      cls:'inactive',
      label:'Googleログイン待ち',
      copy:'まずGoogleアカウントでログインし、その後にStripeの月額登録へ進みます。',
      action:`<button class="vault-link" onclick="openMemberAccessModal('start-paid')">Googleでログイン</button>`,
    };
  }
  if(MEMBER_AUTH.authLoggedIn&&MEMBER_AUTH.stripeCheckoutReady){
    return{
      cls:'inactive',
      label:'Stripe登録待ち',
      copy:'ログイン済みです。Stripeで月額登録を行うと有料鑑定と追加質問が開きます。',
      action:`<button class="vault-link" onclick="openStripeCheckout('start-paid')">Stripeで月額登録</button>`,
    };
  }
  return{
    cls:'inactive',
    label:MEMBER_AUTH.codeConfigured?'認証コード待ち':'公開準備中',
    copy:MEMBER_AUTH.codeConfigured
      ?'認証コードを入力すると会員セッションを発行できます。'
      :'GoogleログインとStripeの導線を優先しています。必要なら認証コード方式も併用できます。',
    action:`<button class="vault-link" onclick="openMemberAccessModal('start-paid')" ${MEMBER_AUTH.codeConfigured?'':'disabled'}>認証コードを入力</button>`,
  };
}

function applyMemberAuthData(data,overrides={}){
  MEMBER_AUTH={
    ...MEMBER_AUTH,
    checked:true,
    active:!!data?.active,
    source:data?.source||'',
    expiresAt:data?.expiresAt||'',
    localTestMode:!!data?.localTestMode,
    codeConfigured:!!data?.codeConfigured,
    sessionPersistent:!!data?.sessionPersistent,
    authLoggedIn:!!data?.authLoggedIn,
    authProvider:data?.authProvider||'',
    authSessionPersistent:!!data?.authSessionPersistent,
    developerAccess:!!data?.developerAccess,
    googleClientConfigured:!!data?.googleClientConfigured,
    googleClientId:data?.googleClientId||'',
    userId:data?.userId||'',
    userName:data?.userName||'',
    userEmail:data?.userEmail||'',
    userPicture:data?.userPicture||'',
    error:'',
    stripeEnabled:!!data?.stripeEnabled,
    stripeCheckoutReady:!!data?.stripeCheckoutReady,
    stripePortalReady:!!data?.stripePortalReady,
    stripeWebhookReady:!!data?.stripeWebhookReady,
    subscriptionStatus:data?.subscriptionStatus||'',
    customerEmail:data?.customerEmail||'',
    customerName:data?.customerName||'',
    productLabel:data?.productLabel||'',
    currentPeriodEnd:data?.currentPeriodEnd||'',
    cancelAtPeriodEnd:!!data?.cancelAtPeriodEnd,
    manageBillingAvailable:!!data?.manageBillingAvailable,
    ...overrides,
  };
  return MEMBER_AUTH;
}

async function loadMemberStatus(options={}){
  if(location.protocol==='file:'&&!FILE_PROXY_ORIGIN) await resolveFileProxyOrigin();
  const syncLocalPreview=options.syncLocalPreview!==false;
  if(!canUseProxy()){
    applyMemberAuthData({
      active:MEMBER_MODE&&canUsePaidTestMode(),
      source:MEMBER_MODE?'local_preview':'',
      localTestMode:LOCAL_TEST_RUNTIME,
      googleClientConfigured:false,
      stripeEnabled:false,
      stripeCheckoutReady:false,
      stripePortalReady:false,
      stripeWebhookReady:false,
    },{error:'LOCAL_FILE'});
    if(options.render!==false){
      renderHomeVault();
      renderMemberFollowupSection();
      renderGoogleAuthShell();
    }
    return MEMBER_AUTH;
  }
  try{
    const res=await fetchApi(MEMBER_STATUS_ENDPOINT,{cache:'no-store'});
    const data=await readJsonSafe(res);
    if(!res.ok){
      throw new Error(getServerErrorMessage(data,'会員状態の確認に失敗しました'));
    }
    applyMemberAuthData(data);
  }catch(e){
    applyMemberAuthData({
      active:false,
      source:'',
      localTestMode:canUsePaidTestMode(),
      googleClientConfigured:!!RUNTIME_HEALTH.google,
      stripeEnabled:!!RUNTIME_HEALTH.stripeCheckoutReady,
      stripeCheckoutReady:!!RUNTIME_HEALTH.stripeCheckoutReady,
      stripePortalReady:!!RUNTIME_HEALTH.stripePortalReady,
      stripeWebhookReady:false,
      codeConfigured:!!RUNTIME_HEALTH.memberCodeConfigured,
    },{error:'FETCH_FAILED'});
  }
  if(syncLocalPreview&&MEMBER_MODE&&canUsePaidTestMode()&&!MEMBER_AUTH.active){
    await activateMemberSession({mode:'local_preview'},{silent:true,render:options.render});
    return MEMBER_AUTH;
  }
  await syncReadingHistoryFromVault({silent:true,render:false,force:options.force===true});
  if(options.render!==false){
    renderHomeVault();
    renderMemberFollowupSection();
    renderGoogleAuthShell();
  }
  return MEMBER_AUTH;
}

async function activateMemberSession(payload={},options={}){
  try{
    const res=await fetchApi(MEMBER_SESSION_ENDPOINT,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload),
    });
    const data=await readJsonSafe(res);
    if(!res.ok){
      const message=getServerErrorMessage(data,'会員セッションを発行できませんでした');
      if(options.silent!==true) setMemberAccessError(message);
      return false;
    }
    applyMemberAuthData(data);
    if(payload?.mode==='local_preview') rememberMemberPreview(true);
    await syncReadingHistoryFromVault({silent:true,render:false,force:true});
    if(options.render!==false){
      renderHomeVault();
      renderMemberFollowupSection();
      renderGoogleAuthShell();
    }
    if(options.silent!==true){
      clearMemberAccessError();
      showToast(
        payload?.mode==='local_preview'
          ?'ローカル試験セッションを有効化しました'
          :(payload?.mode==='developer'
            ?'開発者権限を有効化しました'
            :'会員セッションを有効化しました')
      );
    }
    return true;
  }catch(e){
    if(options.silent!==true) setMemberAccessError('会員セッションの通信に失敗しました');
    return false;
  }
}

async function logoutMemberSession(options={}){
  try{
    await fetchApi(MEMBER_LOGOUT_ENDPOINT,{method:'POST'});
  }catch(e){}
  rememberMemberPreview(false);
  applyMemberAuthData({
    active:false,
    source:'',
    expiresAt:'',
    localTestMode:canUsePaidTestMode(),
    codeConfigured:MEMBER_AUTH.codeConfigured,
    sessionPersistent:MEMBER_AUTH.sessionPersistent,
    googleClientConfigured:MEMBER_AUTH.googleClientConfigured,
    googleClientId:MEMBER_AUTH.googleClientId,
    stripeEnabled:MEMBER_AUTH.stripeEnabled,
    stripeCheckoutReady:MEMBER_AUTH.stripeCheckoutReady,
    stripePortalReady:MEMBER_AUTH.stripePortalReady,
    stripeWebhookReady:MEMBER_AUTH.stripeWebhookReady,
    subscriptionStatus:'',
    customerEmail:'',
    customerName:'',
    productLabel:MEMBER_AUTH.productLabel,
    currentPeriodEnd:'',
    cancelAtPeriodEnd:false,
    manageBillingAvailable:false,
  });
  HISTORY_SYNC_STATE.lastScope='';
  if(options.render!==false){
    renderHomeVault();
    renderMemberFollowupSection();
    renderGoogleAuthShell();
  }
  if(options.silent!==true) showToast('会員セッションを終了しました');
}

function clearGoogleAuthError(){
  const el=document.getElementById('google-auth-error');
  if(!el) return;
  el.style.display='none';
  el.textContent='';
}

function clearDeveloperAccessError(){
  const el=document.getElementById('developer-access-error');
  if(!el) return;
  el.style.display='none';
  el.textContent='';
}

function setDeveloperAccessError(message){
  const el=document.getElementById('developer-access-error');
  if(!el) return;
  el.className='key-status ng';
  el.textContent='× '+message;
  el.style.display='block';
}

function canUseDeveloperQuickAccess(){
  return LOCAL_TEST_RUNTIME||DEV_MODE;
}

function setGoogleAuthError(message){
  const el=document.getElementById('google-auth-error');
  if(!el) return;
  el.className='key-status ng';
  el.textContent='× '+message;
  el.style.display='block';
}

function renderGoogleAuthShell(){
  const shell=document.getElementById('google-auth-shell');
  const copy=document.getElementById('google-auth-copy');
  if(!shell||!copy) return;
  const shouldShow=!!(MEMBER_AUTH.googleClientConfigured&&!MEMBER_AUTH.authLoggedIn&&!canUsePaidTestMode());
  shell.style.display=shouldShow?'block':'none';
  if(!shouldShow){
    clearGoogleAuthError();
    return;
  }
  copy.textContent=MEMBER_AUTH.stripeCheckoutReady
    ?'Googleでログインすると、そのままStripeの月額登録へ進めます。'
    :'Googleでログインしたうえで、会員状態と購入履歴をこの端末にひも付けます。';
  scheduleGoogleSignInRender();
}

function renderDeveloperAccessShell(){
  const shell=document.getElementById('developer-access-shell');
  const copy=document.getElementById('developer-access-copy');
  const input=document.getElementById('developer-email-input');
  const btn=document.getElementById('developer-access-btn');
  if(!shell||!copy||!input||!btn) return;
  const shouldShow=!!(canUseDeveloperQuickAccess()&&!isMemberActive());
  shell.style.display=shouldShow?'block':'none';
  if(!shouldShow){
    clearDeveloperAccessError();
    return;
  }
  input.value=input.value||DEVELOPER_DEFAULT_EMAIL;
  copy.textContent=canUseProxy()
    ?'Googleがまだでも大丈夫です。開発者はこれで有料を開けます。'
    :'サーバーなしの確認用です。開発者だけこのまま入れます。';
  btn.textContent='開発者で入る';
}

function scheduleGoogleSignInRender(retry=0){
  clearTimeout(GOOGLE_SIGNIN_RENDER_TIMER);
  const target=document.getElementById('google-signin-btn');
  if(!target||!MEMBER_AUTH.googleClientConfigured||MEMBER_AUTH.authLoggedIn||canUsePaidTestMode()) return;
  if(window.google?.accounts?.id&&MEMBER_AUTH.googleClientId){
    try{
      target.innerHTML='';
      window.google.accounts.id.initialize({
        client_id:MEMBER_AUTH.googleClientId,
        callback:handleGoogleCredentialResponse,
        auto_select:false,
        cancel_on_tap_outside:true,
      });
      window.google.accounts.id.renderButton(target,{
        theme:'outline',
        size:'large',
        shape:'pill',
        text:'signin_with',
        logo_alignment:'left',
        width:260,
      });
      clearGoogleAuthError();
    }catch(e){
      setGoogleAuthError('Googleログインボタンを表示できませんでした');
    }
    return;
  }
  if(retry>=12) return;
  GOOGLE_SIGNIN_RENDER_TIMER=setTimeout(()=>scheduleGoogleSignInRender(retry+1),500);
}

async function handleGoogleCredentialResponse(response){
  const credential=response?.credential||'';
  if(!credential){
    setGoogleAuthError('Googleの認証情報を受け取れませんでした');
    return;
  }
  try{
    clearGoogleAuthError();
    showToast('Googleログインを確認しています');
    const res=await fetchApi(GOOGLE_AUTH_ENDPOINT,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({credential}),
    });
    const data=await readJsonSafe(res);
    if(!res.ok){
      setGoogleAuthError(getServerErrorMessage(data,'Googleログインに失敗しました'));
      return;
    }
    applyMemberAuthData(data);
    await syncReadingHistoryFromVault({silent:true,render:false,force:true});
    renderHomeVault();
    renderMemberFollowupSection();
    renderGoogleAuthShell();
    closeMemberAccessModal(false);
    showToast('Googleログインが完了しました');
    resumePendingMemberIntent();
  }catch(e){
    setGoogleAuthError('Googleログインの通信に失敗しました');
  }
}

function consumeStripeReturnIntent(){
  try{
    const value=sessionStorage.getItem(STRIPE_RETURN_INTENT_KEY)||'';
    sessionStorage.removeItem(STRIPE_RETURN_INTENT_KEY);
    return value;
  }catch(e){
    return'';
  }
}

function saveStripeReturnIntent(intent=''){
  try{
    if(intent) sessionStorage.setItem(STRIPE_RETURN_INTENT_KEY,intent);
  }catch(e){}
}

function cleanupStripeReturnParams(){
  const url=new URL(location.href);
  url.searchParams.delete('stripe_success');
  url.searchParams.delete('stripe_cancel');
  url.searchParams.delete('session_id');
  history.replaceState({},'',url.pathname+(url.search||'')+(url.hash||''));
}

async function openStripeCheckout(intent='start-paid'){
  if(!canUseProxy()){
    showToast('server.js 経由で開いたときだけ Stripe を使えます');
    return false;
  }
  if(!MEMBER_AUTH.authLoggedIn){
    openMemberAccessModal(intent);
    return false;
  }
  try{
    const res=await fetchApi(STRIPE_CHECKOUT_ENDPOINT,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({intent}),
    });
    const data=await readJsonSafe(res);
    if(!res.ok){
      const message=getServerErrorMessage(data,'Stripeの購入画面を開けませんでした');
      showToast(message);
      if(data?.error==='AUTH_REQUIRED') openMemberAccessModal(intent);
      return false;
    }
    if(!data?.url){
      showToast('Stripeの購入URLを取得できませんでした');
      return false;
    }
    saveStripeReturnIntent(intent);
    location.href=data.url;
    return true;
  }catch(e){
    showToast('Stripeの購入画面への接続に失敗しました');
    return false;
  }
}

async function openStripeBillingPortal(){
  if(!canUseProxy()){
    showToast('server.js 経由で開いたときだけ請求管理を使えます');
    return false;
  }
  try{
    const res=await fetchApi(STRIPE_PORTAL_ENDPOINT,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({returnUrl:'/uranai-v5.html'}),
    });
    const data=await readJsonSafe(res);
    if(!res.ok){
      showToast(getServerErrorMessage(data,'Stripeの請求管理を開けませんでした'));
      return false;
    }
    if(!data?.url){
      showToast('Stripeの請求管理URLを取得できませんでした');
      return false;
    }
    location.href=data.url;
    return true;
  }catch(e){
    showToast('Stripeの請求管理への接続に失敗しました');
    return false;
  }
}

async function handleStripeReturnFlow(){
  if(!canUseProxy()) return;
  const url=new URL(location.href);
  const canceled=url.searchParams.get('stripe_cancel')==='1';
  const succeeded=url.searchParams.get('stripe_success')==='1';
  const sessionId=String(url.searchParams.get('session_id')||'').trim();
  if(canceled){
    consumeStripeReturnIntent();
    cleanupStripeReturnParams();
    showToast('Stripeの購入をキャンセルしました');
    return;
  }
  if(!succeeded||!sessionId) return;
  try{
    const res=await fetchApi(`${STRIPE_CHECKOUT_COMPLETE_ENDPOINT}?session_id=${encodeURIComponent(sessionId)}`,{cache:'no-store'});
    const data=await readJsonSafe(res);
    if(!res.ok){
      showToast(getServerErrorMessage(data,'Stripeの購入完了を確認できませんでした'));
      cleanupStripeReturnParams();
      consumeStripeReturnIntent();
      return;
    }
    applyMemberAuthData(data);
    await syncReadingHistoryFromVault({silent:true,render:false,force:true});
    renderHomeVault();
    renderMemberFollowupSection();
    renderGoogleAuthShell();
    cleanupStripeReturnParams();
    const intent=consumeStripeReturnIntent();
    showToast('Stripeの会員登録を確認しました');
    if(intent==='start-paid'){
      setTimeout(()=>startFlowUnlocked('paid'),180);
      return;
    }
    if(intent==='upgrade-paid'&&canContinueCurrentReadingToPaid()){
      setTimeout(()=>upgradeCurrentReadingToPaidUnlocked(),180);
    }
  }catch(e){
    cleanupStripeReturnParams();
    consumeStripeReturnIntent();
    showToast('Stripeの購入完了確認に失敗しました');
  }
}

function clearMemberAccessError(){
  const el=document.getElementById('member-access-error');
  if(!el) return;
  el.style.display='none';
  el.textContent='';
}

function setMemberAccessError(message){
  const el=document.getElementById('member-access-error');
  if(!el) return;
  el.className='key-status ng';
  el.textContent='× '+message;
  el.style.display='block';
}

function openMemberAccessModal(intent=''){
  MEMBER_PENDING_INTENT=intent||'';
  const modal=document.getElementById('member-access-modal');
  const desc=document.getElementById('member-access-desc');
  const guide=document.getElementById('member-access-guide');
  const status=document.getElementById('member-access-status');
  const localBtn=document.getElementById('member-local-preview-btn');
  const accessLabel=document.getElementById('member-access-label');
  const input=document.getElementById('member-access-input');
  const submitBtn=document.getElementById('member-access-submit-btn');
  clearMemberAccessError();
  clearGoogleAuthError();
  clearDeveloperAccessError();
  if(desc){
    desc.textContent=canUseDeveloperQuickAccess()
      ?'開発者ならすぐ入れます。ふつうの会員はGoogleとStripeです。'
      :(MEMBER_AUTH.googleClientConfigured&&!MEMBER_AUTH.authLoggedIn
        ?'有料は、Googleでログインしてから進みます。'
        :'有料は、会員確認ができた人だけ開きます。');
  }
  if(guide){
    guide.textContent=canUseDeveloperQuickAccess()
      ?'開発者は上のボタン。会員テストは下の方法でも確認できます。'
      :(MEMBER_AUTH.googleClientConfigured&&!MEMBER_AUTH.authLoggedIn
        ?'Googleログイン後にStripeへ進みます。'
        :(MEMBER_AUTH.codeConfigured
          ?'認証コードがあるなら下に入れてください。'
          :'会員導線はGoogleログインを優先しています。'));
  }
  if(status){
    const usesGoogle=MEMBER_AUTH.googleClientConfigured&&!MEMBER_AUTH.authLoggedIn&&!canUsePaidTestMode();
    const usesDeveloper=canUseDeveloperQuickAccess();
    status.className=`runtime-status ${usesDeveloper||canUsePaidTestMode()||usesGoogle?'ok':'warn'}`;
    status.innerHTML=usesDeveloper
      ?'<div class="runtime-status-title">開発者はここで入れます</div><div class="runtime-status-detail">ローカル確認なので、開発者ボタンからそのまま有料へ進めます。</div>'
      :canUsePaidTestMode()
      ?'<div class="runtime-status-title">ローカル試験を使えます</div><div class="runtime-status-detail">localhost から開いているため、試験セッションを発行して有料導線を検証できます。</div>'
      :(usesGoogle
        ?'<div class="runtime-status-title">Googleログインから始めます</div><div class="runtime-status-detail">ログイン後にStripeの月額登録へ進めます。</div>'
        :`<div class="runtime-status-title">${MEMBER_AUTH.codeConfigured?'認証コードを使えます':'会員導線の準備中です'}</div><div class="runtime-status-detail">${MEMBER_AUTH.codeConfigured?'認証コードで会員セッションを発行できます。':'Googleログインまたは認証コードの設定を確認してください。'}</div>`);
  }
  if(localBtn) localBtn.style.display=canUsePaidTestMode()?'inline-flex':'none';
  renderGoogleAuthShell();
  renderDeveloperAccessShell();
  const showAccess=(MEMBER_AUTH.codeConfigured||canUsePaidTestMode());
  if(accessLabel) accessLabel.style.display=showAccess?'block':'none';
  if(input){
    input.value='';
    input.disabled=!showAccess;
    input.style.display=showAccess?'block':'none';
  }
  if(submitBtn) submitBtn.style.display=showAccess?'inline-flex':'none';
  if(modal) modal.classList.add('on');
}

function closeMemberAccessModal(clearIntent=true){
  const modal=document.getElementById('member-access-modal');
  if(modal) modal.classList.remove('on');
  if(clearIntent) MEMBER_PENDING_INTENT='';
  clearMemberAccessError();
  clearGoogleAuthError();
}

function handleMemberAccessKeydown(event){
  if(event.key==='Enter'){
    event.preventDefault();
    submitMemberAccessCode();
  }
}

async function activateLocalPreviewFromModal(){
  const ok=await activateMemberSession({mode:'local_preview'},{render:true});
  if(!ok) return;
  closeMemberAccessModal(false);
  resumePendingMemberIntent();
}

async function submitMemberAccessCode(){
  const input=document.getElementById('member-access-input');
  const accessCode=input?.value?.trim()||'';
  if(!accessCode){
    setMemberAccessError('認証コードを入力してください');
    return;
  }
  const ok=await activateMemberSession({accessCode},{render:true});
  if(!ok) return;
  closeMemberAccessModal(false);
  resumePendingMemberIntent();
}

async function submitDeveloperAccess(){
  const input=document.getElementById('developer-email-input');
  const email=(input?.value||DEVELOPER_DEFAULT_EMAIL).trim().toLowerCase();
  if(!email){
    setDeveloperAccessError('メールを入れてください');
    return;
  }
  if(!canUseDeveloperQuickAccess()){
    setDeveloperAccessError('開発者用はローカルだけです');
    return;
  }
  if(location.protocol==='file:'&&!FILE_PROXY_ORIGIN) await resolveFileProxyOrigin();
  if(!canUseProxy()){
    applyMemberAuthData({
      active:true,
      source:'developer',
      expiresAt:'',
      localTestMode:true,
      authLoggedIn:true,
      authProvider:'developer',
      developerAccess:true,
      userId:'developer-local',
      userName:DEVELOPER_DEFAULT_NAME,
      userEmail:email,
    });
    renderHomeVault();
    renderMemberFollowupSection();
    renderGoogleAuthShell();
    closeMemberAccessModal(false);
    showToast('開発者権限を有効にしました');
    resumePendingMemberIntent();
    return;
  }
  const ok=await activateMemberSession({
    mode:'developer',
    email,
    name:DEVELOPER_DEFAULT_NAME,
  },{render:true});
  if(!ok){
    setDeveloperAccessError('開発者で入れませんでした');
    return;
  }
  clearDeveloperAccessError();
  closeMemberAccessModal(false);
  resumePendingMemberIntent();
}

async function ensurePaidAccess(intent=''){
  if(isMemberActive()) return true;
  if(location.protocol==='file:'){
    openMemberAccessModal(intent);
    return false;
  }
  if(canUsePaidTestMode()){
    rememberMemberPreview(true);
    const ok=await activateMemberSession({mode:'local_preview'},{silent:true,render:true});
    if(!ok){
      showToast('ローカル試験セッションを発行できませんでした');
      return false;
    }
    return true;
  }
  if(MEMBER_AUTH.googleClientConfigured&&!MEMBER_AUTH.authLoggedIn){
    openMemberAccessModal(intent);
    return false;
  }
  if(MEMBER_AUTH.authLoggedIn&&MEMBER_AUTH.stripeCheckoutReady){
    await openStripeCheckout(intent||'start-paid');
    return false;
  }
  openMemberAccessModal(intent);
  return false;
}

function resumePendingMemberIntent(){
  const intent=MEMBER_PENDING_INTENT;
  MEMBER_PENDING_INTENT='';
  if(!intent) return;
  if(isMemberActive()){
    if(intent==='start-paid') startFlowUnlocked('paid');
    if(intent==='upgrade-paid'&&canContinueCurrentReadingToPaid()) upgradeCurrentReadingToPaidUnlocked();
    return;
  }
  if(MEMBER_AUTH.authLoggedIn&&MEMBER_AUTH.stripeCheckoutReady){
    openStripeCheckout(intent);
  }
}

function repairStaticCopy(){
  const setText=(selector,text)=>{
    const el=document.querySelector(selector);
    if(el) el.textContent=text;
  };
  const setHtml=(selector,html)=>{
    const el=document.querySelector(selector);
    if(el) el.innerHTML=html;
  };
  const setPlaceholder=(selector,text)=>{
    const el=document.querySelector(selector);
    if(el) el.setAttribute('placeholder',text);
  };
  const setButtons=(selector,texts=[])=>{
    const nodes=document.querySelectorAll(selector);
    texts.forEach((text,index)=>{
      if(nodes[index]) nodes[index].textContent=text;
    });
  };
  const setField=(inputId,{label='',note='',placeholder=''}={})=>{
    const input=document.getElementById(inputId);
    const field=input?.closest('.field-group');
    if(!field) return;
    const labelEl=field.querySelector('.field-label');
    const noteEl=field.querySelector('.field-note');
    if(label&&labelEl) labelEl.textContent=label;
    if(note&&noteEl) noteEl.textContent=note;
    if(placeholder&&input) input.setAttribute('placeholder',placeholder);
  };
  const setWithin=(root,selector,text)=>{
    const el=root?.querySelector(selector);
    if(el) el.textContent=text;
  };

  const settingsBtn=document.getElementById('settings-btn');
  if(settingsBtn) settingsBtn.title='APIキー設定（開発者モード）';
  setText('#settings-modal .modal-title','APIキーの設定');
  setHtml('#settings-modal .modal-desc','これは開発者モード専用の直接接続設定です。<br>推奨は `.env` に `OPENAI_API_KEY` を入れて `start-uranai.ps1` から起動する方法です。<br>この入力欄は Anthropic 直接接続の開発用 fallback です。<br>キーはブラウザの sessionStorage に保存されます（タブを閉じると消えます）。');
  setButtons('#settings-modal .modal-btns button',['接続テスト','保存して閉じる','キャンセル']);

  setText('#member-access-modal .modal-title','深掘り鑑定の認証');
  setText('#member-access-label','ACCESS CODE');
  setPlaceholder('#member-access-input','認証コードを入力');
  setButtons('#member-access-modal .modal-btns button',['ローカル試験を開始','認証して続ける','閉じる']);

  setHtml('#s-top .top-desc','真の占いとは夜海を照らす灯台ではなく、<br>暗闇の中で確信を与えるコンパスである');
  setText('#s-top .btn-top.btn-paid','✦ 会員で深掘り鑑定');
  setText('#s-top .btn-top.btn-free','無料1回を試す');
  setText('#s-top .top-note','無料：いまの向きを知る / 深掘り鑑定：迷いをほどき、自分で進路を選べるところまで読む');

  const vaultCards=document.querySelectorAll('#s-top .vault-grid .vault-card');
  if(vaultCards[0]){
    setWithin(vaultCards[0],'.vault-eyebrow','羅針記録');
    setWithin(vaultCards[0],'.vault-title','前回の続きから読む');
    setWithin(vaultCards[0],'.vault-desc','前回の鑑定を呼び戻して、同じテーマの続きをそのまま深掘りできます。同じ名前・生年月日のプロフィールなら、別端末でも続きが拾えます。');
    setWithin(vaultCards[0],'#recent-history-empty','最初の鑑定を受けると、ここに前回の流れが残ります。次に迷ったときは、その続きから読み直せます。同じプロフィールであれば別端末からも呼び戻せます。');
    setWithin(vaultCards[0],'#continue-reading-btn','前回の続きを開く');
  }
  if(vaultCards[1]){
    setWithin(vaultCards[1],'.vault-eyebrow','傾向の地図');
    setWithin(vaultCards[1],'.vault-title','迷いの傾向地図');
    setWithin(vaultCards[1],'.vault-desc','続けるほど、よく出るカードや繰り返すテーマから、自分の迷いと戻り方が見えてきます。');
    setWithin(vaultCards[1],'#pattern-summary-empty','鑑定が増えると、繰り返し出るカードやテーマから「迷いの癖」がここに見えてきます。');
  }
  if(vaultCards[2]){
    setWithin(vaultCards[2],'.vault-eyebrow','あとから使えること');
    setWithin(vaultCards[2],'.vault-title','読み返しと記録');
  }

  setText('#s-input .input-title','まずは、あなたのことを少しだけ');
  setField('f-fullname',{
    label:'お名前（本名がおすすめ）',
    note:'※名前から伝わる印象も見るため、本名での入力がおすすめです。スペースなしでも推定できますが、「姓 名」で区切ると安定します。',
    placeholder:'例：山田 花子',
  });
  const genderField=document.getElementById('gb-female')?.closest('.field-group');
  if(genderField){
    setWithin(genderField,'.field-label','性別');
    setWithin(genderField,'#gb-other','その他');
  }
  setField('f-year',{
    label:'誕生年月日',
    note:'※日がわからない場合は「不明」を選べます。その場合は、生まれた年と月から見える傾向を中心に読みます。',
  });
  setButtons('#s-input .date-grid .date-label',['年','月','日']);
  setField('f-hour',{label:'生まれた時間（わかる範囲で）'});
  setField('f-cat',{label:'相談テーマ'});
  const catSelect=document.getElementById('f-cat');
  if(catSelect){
    const optionMap={
      '総合':'総合（全体的な流れ）',
      '恋愛':'恋愛・結婚',
      '仕事':'仕事・転職・お金',
      '人間関係':'人間関係',
      '健康':'健康・生活習慣',
    };
    [...catSelect.options].forEach(option=>{
      const label=optionMap[option.value];
      if(label) option.textContent=label;
    });
  }
  setField('f-theme',{
    label:'いま、いちばん気になっていること',
    placeholder:'例：今の仕事を続けるべきか迷っています。上司との関係もしんどく、このままでいいのか不安です。まとまっていなくても、そのまま書いて大丈夫です。',
  });
  const reactionField=document.getElementById('reaction-progress')?.closest('.field-group');
  if(reactionField){
    setWithin(reactionField,'.field-label','魂の本質診断');
    setWithin(reactionField,'.field-note','価値観の正しさではなく、実際にイラッとした場面や居心地よかった場面に近いほうを選んでください。答えに応じて、次の質問が少しだけ変わります。');
    setWithin(reactionField,'.reaction-actions .vault-link','この質問をやり直す');
  }
  setText('#s-input .check-label','入力内容を次回のために自動保存する（この端末だけ）');
  setText('#s-input .local-data-note','保存されるのはこの端末だけです。あとから自分で消せます。');
  setButtons('#s-input .local-data-actions .vault-link',['保存した入力を消す','この履歴を消す']);
  setButtons('#s-input .input-btns button',['この内容で占う ✦','サンプルで試す']);

  setText('#len-inst','止めた瞬間に、上から並びをそのまま引きます');
  setText('#len-stop-btn','シャッフルを止める');
  setText('#len-cards-full .deck-instruction','引いたカード');
  setText('#len-cards-full .nav-btn-primary','次へ：数秘オラクルカード');
  setButtons('#len-cards-full .flow-nav-btn',['ルノルマンを引き直す','入力へ戻る']);

  setText('#orc-inst','止めたあと、裏向きカードの中から直感で選びます');
  setText('#orc-stop-btn','シャッフルを止める');
  const selCounter=document.querySelector('#orc-select-area .sel-counter');
  if(selCounter) selCounter.innerHTML='選んだカード <em id="orc-sel-count">0</em> / <em id="orc-sel-max">3</em> 枚';
  setText('#orc-confirm-btn','このカードで決定 ✦');
  setButtons('#orc-select-area .flow-nav-btn',['ルノルマンへ戻る','入力へ戻る']);
  setText('#orc-cards-full .deck-instruction','引いたカード');
  setText('#orc-cards-full .nav-btn-primary','結果を見る ✦');
  setButtons('#orc-cards-full .flow-nav-btn',['オラクルを引き直す','ルノルマンへ戻る','入力へ戻る']);

  setText('#s-clarify .clarify-title','今の状況に、読みをもう少し近づけます');
  setHtml('#s-clarify .clarify-desc','答えられる範囲だけで大丈夫です。<br>近い選択肢を選ぶか、そのまま言葉で書いてください。<br><span style="font-size:11px;color:rgba(201,149,42,.4);">少し補足があるだけで、結果があなたの現実により沿いやすくなります。</span>');
  setButtons('#s-clarify .clarify-btns button',['この内容で読みを深める ✦','このまま結果へ']);
  setButtons('#s-clarify .flow-nav-btn',['カードに戻る','入力を見直す']);

  setText('#s-result .result-progress-eyebrow','鑑定の進み');
  setText('#result-progress-title','結果をまとめています');
  setText('#result-progress-copy','いまの向きと次の進路を順に整理し、まとまったところから下に反映しています。');
  setText('#rs-basis .result-detail-title','名前・生まれ・魂の本質診断から見える傾向を見る');
  setText('#rs-basis .result-detail-copy','カード結果を読んだあと、必要なときだけ土台を開ける形にしています。');
  const basisPanels=document.querySelectorAll('#rs-basis .basis-panel');
  if(basisPanels[0]){
    setWithin(basisPanels[0],'.basis-panel-title','名前から見える傾向');
    setWithin(basisPanels[0],'.basis-panel-copy','名前から伝わりやすい印象や、人との関わり方のクセをやさしい言葉でまとめます。');
  }
  if(basisPanels[1]){
    setWithin(basisPanels[1],'.basis-panel-title','生まれから見える傾向');
    setWithin(basisPanels[1],'.basis-panel-copy','生まれた時期から見える、力の出し方や揺れやすい場面をかみくだいて整理します。');
  }
  if(basisPanels[2]){
    setWithin(basisPanels[2],'.basis-panel-title','魂の本質診断から見える傾向');
    setWithin(basisPanels[2],'.basis-panel-copy','答え方のクセから、しんどくなりやすい場面と元気が出やすい動き方を整理します。');
  }
  setText('#rs-len .rs-eyebrow','カード鑑定 01');
  setHtml('#rs-len .rs-title','<span class="rs-icon">⚜</span>ルノルマンカード鑑定');
  setText('#rs-len .rs-copy','最初に、現状の流れと見落としやすい点をルノルマンカードから整理します。');
  setText('#r-len-block .ai-load-title','いま起きていることを整理しています');
  setText('#r-len-block .ai-load-detail','迷いを増やす説明ではなく、状況の核心と判断材料だけを言葉にしています。');
  setText('#rs-orc .rs-eyebrow','カード鑑定 02');
  setHtml('#rs-orc .rs-title','<span class="rs-icon">✦</span>オラクルカード鑑定');
  setText('#rs-orc .rs-copy','次に、背景の流れを受け取りながら、その人の本質と未来へつながる整え方をまとめます。');
  setText('#r-orc-block .ai-load-title','気持ちの整理を進めています');
  setText('#r-orc-block .ai-load-detail','迷った日に戻れる言葉と、今日から取りうる一歩へ絞ってまとめています。');
  setButtons('#rs-orc .nav-btn',['最初に戻る','もう一度占う','履歴へ']);
  setText('#rs-integration .rs-eyebrow','最終結論');
  setHtml('#rs-integration .rs-title','<span class="rs-icon">✧</span>いまの答え');
  setText('#rs-integration .rs-copy','迷ったときにここだけ読み返せば、優先順位と次の一歩がわかる形にまとめます。');
  setText('#r-aiload .ai-load-title','結論を整えています');
  setText('#r-aiload .ai-load-detail','ここまでの読みを一本にまとめ、今どう動くかまで落とし込んでいます。');
  setText('#dossier-save-btn','PDF保存');
  setText('#dossier-copy-inline-btn','鑑定書コピー');
  const shareBtn=document.getElementById('share-x-btn');
  if(shareBtn){
    const svg=shareBtn.querySelector('svg');
    shareBtn.textContent='Xでシェア';
    if(svg) shareBtn.prepend(svg);
  }
  setText('#dossier-title','鑑定書を整えています');
  setText('#dossier-subtitle','今回の鑑定結果を、PDFやコピーで残しやすい形へ整えています。');
  setText('#dossier-print-btn','印刷 / PDF保存');
  setText('#dossier-copy-btn','要約をコピー');
  setText('#dossier-loading span','鑑定書を製本しています…');
}

function renderBrandLayer(){
  const setText=(id,value)=>{
    const el=document.getElementById(id);
    if(el) el.textContent=value;
  };
  setText('brand-app-name',BRAND_PROFILE.appName);
  setText('brand-app-subtitle',BRAND_PROFILE.appSubtitle);
  setText('guide-eyebrow',BRAND_PROFILE.guide.eyebrow);
  setText('guide-name',BRAND_PROFILE.guide.name);
  setText('guide-role',BRAND_PROFILE.guide.role);
  setText('guide-sigil',BRAND_PROFILE.guide.sigil);
  setText('guide-shell-label',BRAND_PROFILE.guide.shellLabel);
  setText('guide-quote',BRAND_PROFILE.guide.quote);
  setText('guide-note',BRAND_PROFILE.guide.note);

  const offerGrid=document.getElementById('offer-grid');
  if(offerGrid){
    const offerEntries=[
      {key:'free',cls:''},
      {key:'member',cls:'member'},
    ];
    offerGrid.innerHTML=offerEntries.map(({key,cls})=>{
      const offer=BRAND_PROFILE.offers[key];
      return`
        <div class="offer-card ${cls}">
          <div class="offer-card-top">
            <div class="offer-card-title">${escapeHtml(offer.title)}</div>
            <div class="offer-card-badge">${escapeHtml(offer.badge)}</div>
          </div>
          <div class="offer-card-price">${escapeHtml(offer.price)}</div>
          <div class="offer-list">${offer.items.map(item=>`<div class="offer-item">${escapeHtml(item)}</div>`).join('')}</div>
        </div>`;
    }).join('');
  }
}

function renderTopHeroPanels(){
  const hero=BRAND_PROFILE.hero||{};
  const valueEl=document.getElementById('top-value-card');
  if(valueEl){
    valueEl.innerHTML=`
      <div class="top-side-eyebrow">${escapeHtml(hero.valueEyebrow||'内なる羅針盤')}</div>
      <div class="top-side-title">${escapeHtml(hero.valueTitle||'読み終わったあとに残るもの')}</div>
      <div class="top-point-list">${(hero.points||[]).map(point=>`
        <div class="top-point-row">
          <div class="top-point-num">${escapeHtml(point.num||'')}</div>
          <div>
            <div class="top-point-title">${escapeHtml(point.title||'')}</div>
            <div class="top-point-copy">${escapeHtml(point.copy||'')}</div>
          </div>
        </div>`).join('')}</div>`;
  }

  const archiveEl=document.getElementById('top-archive-card');
  if(!archiveEl) return;
  const history=getReadingHistory();
  if(!history.length){
    archiveEl.innerHTML=`
      <div class="top-side-eyebrow">${escapeHtml(hero.archiveEyebrow||'羅針記録')}</div>
      <div class="top-side-title">${escapeHtml(hero.archiveTitle||'積み上げるほど、自分の流れが見えてくる')}</div>
      <div class="top-side-copy">${escapeHtml(hero.archiveEmpty||'無料は入口です。深掘り鑑定では、理解された感覚と次の一手、あとから見返せる記録がひとつづきで残ります。')}</div>
      <div class="top-archive-foot">最初の鑑定から、ここにあなたの流れが少しずつ蓄積されていきます。</div>`;
    return;
  }

  const stats=computeReadingStats(history);
  const latest=history[0]||{};
  const latestTheme=latest.input?.theme?truncateText(latest.input.theme,34):'前回のテーマ';
  const streakLabel=stats.streak?`${stats.streak}日`:'1日';
  const latestSummary=`前回は「${latestTheme}」を読みました。続きを開けば、同じ流れのまま迷いの芯まで深掘りできます。`;
  archiveEl.innerHTML=`
    <div class="top-side-eyebrow">${escapeHtml(hero.archiveEyebrow||'羅針記録')}</div>
    <div class="top-side-title">いまの羅針記録</div>
    <div class="top-side-copy">${escapeHtml(latestSummary)}</div>
    <div class="top-archive-metrics">
      <div class="top-archive-metric">
        <div class="top-archive-metric-label">記録数</div>
        <div class="top-archive-metric-value">${escapeHtml(String(stats.total))}回</div>
      </div>
      <div class="top-archive-metric">
        <div class="top-archive-metric-label">深掘り</div>
        <div class="top-archive-metric-value">${escapeHtml(String(stats.paidCount))}回</div>
      </div>
      <div class="top-archive-metric">
        <div class="top-archive-metric-label">継続日</div>
        <div class="top-archive-metric-value">${escapeHtml(streakLabel)}</div>
      </div>
    </div>
    <div class="top-archive-foot">読み返すほど、いま多いテーマや繰り返し出るカードが判断材料として残っていきます。</div>`;
}

function renderPremiumEntrySection(){
  const el=document.getElementById('premium-entry');
  if(!el) return;
  const statusMeta=getMemberStatusMeta();
  const primaryAction=isMemberActive()
    ?`<a class="today-cta" href="?flow=paid" data-flow-target="paid" onclick="if(window.startFlow){startFlow('paid');return false;}">深掘り鑑定を受ける</a>`
    :canUsePaidTestMode()
      ?`<a class="today-cta" href="?flow=paid" data-flow-target="paid" onclick="if(window.startFlow){startFlow('paid');return false;}">ローカル試験で確認する</a>`
      :((MEMBER_AUTH.googleClientConfigured&&!MEMBER_AUTH.authLoggedIn)
        ?`<a class="today-cta" href="?flow=paid" data-member-intent="start-paid" onclick="if(window.openMemberAccessModal){openMemberAccessModal('start-paid');return false;}">Googleでログイン</a>`
        :(MEMBER_AUTH.authLoggedIn&&MEMBER_AUTH.stripeCheckoutReady)
          ?`<button class="today-cta" type="button" onclick="openStripeCheckout('start-paid')">Stripeで月額登録</button>`
          :`<button class="today-cta" type="button" data-member-intent="start-paid" onclick="openMemberAccessModal('start-paid')" ${MEMBER_AUTH.codeConfigured?'':'disabled'}>${MEMBER_AUTH.codeConfigured?'認証コードで進む':'公開準備中'}</button>`);
  el.innerHTML=`
    <div class="premium-entry-head">
      <div>
        <div class="premium-entry-eyebrow">深掘り鑑定</div>
        <div class="premium-entry-title">${escapeHtml(MEMBERSHIP_PLAN.promise)}</div>
        <div class="premium-entry-copy">${escapeHtml(MEMBERSHIP_PLAN.description)}</div>
        <div class="premium-entry-meta">
          <div class="premium-entry-pill">${escapeHtml(MEMBERSHIP_PLAN.price)}</div>
          <div class="premium-entry-pill">${escapeHtml(MEMBERSHIP_PLAN.status)}</div>
          <div class="premium-entry-pill">${escapeHtml(statusMeta.label)}</div>
        </div>
      </div>
    </div>
    <div class="premium-entry-story">
      <div class="premium-entry-story-title">羅針盤が進路へ変わる理由</div>
      ${MEMBERSHIP_PLAN.lead.map(line=>`<div class="premium-entry-story-line">${escapeHtml(line)}</div>`).join('')}
    </div>
    <div class="premium-entry-grid">
      ${MEMBERSHIP_PLAN.features.map(feature=>`
        <div class="premium-entry-summary-card">
          <div class="premium-entry-summary-title">${escapeHtml(feature.title)}</div>
          <div class="premium-entry-summary-copy">${escapeHtml(feature.summary)}</div>
        </div>
      `).join('')}
    </div>
    <div class="premium-entry-detail-stack">
      ${MEMBERSHIP_PLAN.features.map(feature=>`
        <div class="premium-entry-card">
          <div class="premium-entry-card-eyebrow">${escapeHtml(feature.eyebrow)}</div>
          <div class="premium-entry-card-title">${escapeHtml(feature.title)}</div>
          <div class="premium-entry-card-kicker">${escapeHtml(feature.problemLabel||'よくある占いだと')}</div>
          <div class="premium-entry-card-body">${escapeHtml(feature.problem)}</div>
          <div class="premium-entry-card-kicker">${escapeHtml(feature.solutionLabel||'羅針占術ではこう読む')}</div>
          <div class="premium-entry-card-body">${escapeHtml(feature.solution)}</div>
          <div class="premium-entry-card-kicker">${escapeHtml(feature.outcomeLabel||'読み終わるころには')}</div>
          <div class="premium-entry-card-body">${escapeHtml(feature.outcome)}</div>
        </div>
      `).join('')}
    </div>
    <div class="premium-entry-actions">
      ${primaryAction}
      <a class="premium-entry-subbtn" href="?flow=free" data-flow-target="free" onclick="if(window.startFlow){startFlow('free');return false;}">まずは無料で試す</a>
    </div>`;
}

async function toggleMemberPreview(){
  if(!canUsePaidTestMode()){
    showToast('ローカル試験は localhost から開いたときだけ使えます');
    return;
  }
  if(isMemberActive()){
    await logoutMemberSession({render:true});
    return;
  }
  rememberMemberPreview(true);
  const ok=await activateMemberSession({mode:'local_preview'},{render:true});
  if(!ok){
    rememberMemberPreview(false);
    showToast('ローカル試験セッションを発行できませんでした');
  }
}

function isMemberActive(){
  return !!MEMBER_AUTH.active;
}

function resetLatestOutputs(){
  LAST_OUTPUTS={about:'',foundationDeep:'',len:'',orc:'',integration:'',dossier:'',followups:{}};
  ACTIVE_FOLLOWUP_KEY='';
  FOLLOWUP_LOADING=false;
  DOSSIER_LOADING=false;
}

function beginReadingSession(){
  CURRENT_READING_ID='rd_'+Date.now().toString(36)+Math.random().toString(36).slice(2,8);
  CURRENT_READING_CREATED_AT=new Date().toISOString();
  resetLatestOutputs();
}

function escapeHtml(text){
  return String(text||'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function truncateText(text,max=46){
  const raw=String(text||'').trim();
  return raw.length>max?raw.slice(0,max-1)+'…':raw;
}

function getReadingHistory(){
  try{
    const parsed=JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)||'[]');
    return Array.isArray(parsed)?parsed:[];
  }catch(e){
    return [];
  }
}

function setReadingHistory(records){
  try{
    localStorage.setItem(HISTORY_STORAGE_KEY,JSON.stringify(records.slice(0,24)));
  }catch(e){}
}

function buildVaultIdentityFromInput(input={}){
  const fullname=String(input?.fullname||'').trim();
  const year=Number.parseInt(input?.year,10);
  const month=Number.parseInt(input?.month,10);
  if(!fullname||!Number.isFinite(year)||!Number.isFinite(month)) return null;
  const dayRaw=input?.day;
  const day=Number.isFinite(Number.parseInt(dayRaw,10))?Number.parseInt(dayRaw,10):'unknown';
  return{
    fullname,
    gender:String(input?.gender||'unknown').trim()||'unknown',
    year,
    month,
    day,
  };
}

function getPreferredVaultIdentity(){
  const candidates=[
    getCurrentInputSnapshot(),
    (()=>{try{return JSON.parse(localStorage.getItem(INPUT_STORAGE_KEY)||'{}');}catch(e){return{};}})(),
    getReadingHistory()[0]?.input||{},
  ];
  for(const candidate of candidates){
    const identity=buildVaultIdentityFromInput(candidate);
    if(identity) return identity;
  }
  return null;
}

function makeHistoryScopeKey(identity=null){
  if(MEMBER_AUTH.authLoggedIn&&MEMBER_AUTH.userId) return`google:${MEMBER_AUTH.userId}`;
  if(!identity) return'';
  return[
    'profile',
    identity.fullname.toLowerCase(),
    identity.gender||'unknown',
    identity.year,
    identity.month,
    identity.day,
  ].join('|');
}

function mergeReadingHistoryRecords(...recordLists){
  const merged=[];
  const seen=new Set();
  recordLists.flat().forEach(record=>{
    if(!record||typeof record!=='object'||!record.id||seen.has(record.id)) return;
    seen.add(record.id);
    merged.push(record);
  });
  merged.sort((a,b)=>new Date(b?.updatedAt||b?.createdAt||0)-new Date(a?.updatedAt||a?.createdAt||0));
  return merged.slice(0,24);
}

async function postVaultHistory(endpoint,payload={}){
  if(location.protocol==='file:'&&!FILE_PROXY_ORIGIN) await resolveFileProxyOrigin();
  if(!canUseProxy()) return{ok:false,data:null,error:'LOCAL_FILE'};
  const body={};
  if(payload.identity) body.identity=payload.identity;
  if(payload.record) body.record=payload.record;
  try{
    const res=await fetchApi(endpoint,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(body),
    });
    const data=await readJsonSafe(res);
    return{ok:res.ok,data,error:res.ok?'':getServerErrorMessage(data,'Vaultの同期に失敗しました')};
  }catch(e){
    return{ok:false,data:null,error:'Vaultの通信に失敗しました'};
  }
}

async function saveHistoryRecordToVault(record,identity=null){
  if(!record?.id) return false;
  const resolvedIdentity=identity===undefined?buildVaultIdentityFromInput(record.input||{})||getPreferredVaultIdentity():identity;
  if(!resolvedIdentity&&!(MEMBER_AUTH.authLoggedIn&&MEMBER_AUTH.userId)) return false;
  const result=await postVaultHistory(VAULT_SAVE_ENDPOINT,{
    identity:resolvedIdentity,
    record,
  });
  if(result.ok){
    HISTORY_SYNC_STATE.lastVaultMode=String(result.data?.vaultMode||HISTORY_SYNC_STATE.lastVaultMode||'');
    HISTORY_SYNC_STATE.lastUserId=String(result.data?.userId||HISTORY_SYNC_STATE.lastUserId||'');
  }
  return result.ok;
}

async function syncReadingHistoryFromVault(options={}){
  const identity=options.identity===undefined?getPreferredVaultIdentity():options.identity;
  const scopeKey=makeHistoryScopeKey(identity);
  if(!scopeKey) return getReadingHistory();
  if(HISTORY_SYNC_STATE.loading&&!options.force) return getReadingHistory();
  if(!options.force&&HISTORY_SYNC_STATE.lastScope===scopeKey) return getReadingHistory();

  HISTORY_SYNC_STATE.loading=true;
  try{
    const localRecords=getReadingHistory();
    const queryResult=await postVaultHistory(VAULT_QUERY_ENDPOINT,{identity});
    if(!queryResult.ok){
      if(options.silent!==true) showToast(queryResult.error||'Vaultの読込に失敗しました');
      return localRecords;
    }

    let remoteRecords=Array.isArray(queryResult.data?.records)?queryResult.data.records:[];
    let merged=mergeReadingHistoryRecords(localRecords,remoteRecords);
    setReadingHistory(merged);

    const remoteIds=new Set(remoteRecords.map(record=>record?.id).filter(Boolean));
    const localOnly=merged.filter(record=>record?.id&&!remoteIds.has(record.id));
    if(localOnly.length){
      for(const record of [...localOnly].reverse()){
        await saveHistoryRecordToVault(record,identity);
      }
      const refreshed=await postVaultHistory(VAULT_QUERY_ENDPOINT,{identity});
      if(refreshed.ok){
        remoteRecords=Array.isArray(refreshed.data?.records)?refreshed.data.records:[];
        merged=mergeReadingHistoryRecords(localRecords,remoteRecords);
        setReadingHistory(merged);
        HISTORY_SYNC_STATE.lastVaultMode=String(refreshed.data?.vaultMode||HISTORY_SYNC_STATE.lastVaultMode||'');
        HISTORY_SYNC_STATE.lastUserId=String(refreshed.data?.userId||HISTORY_SYNC_STATE.lastUserId||'');
      }
    }else{
      HISTORY_SYNC_STATE.lastVaultMode=String(queryResult.data?.vaultMode||HISTORY_SYNC_STATE.lastVaultMode||'');
      HISTORY_SYNC_STATE.lastUserId=String(queryResult.data?.userId||HISTORY_SYNC_STATE.lastUserId||'');
    }

    HISTORY_SYNC_STATE.lastScope=scopeKey;
    if(options.render!==false) renderHomeVault();
    return getReadingHistory();
  }finally{
    HISTORY_SYNC_STATE.loading=false;
  }
}

async function clearReadingHistoryFromVault(identity=null){
  const resolvedIdentity=identity===undefined?getPreferredVaultIdentity():identity;
  if(!resolvedIdentity&&!(MEMBER_AUTH.authLoggedIn&&MEMBER_AUTH.userId)) return false;
  const result=await postVaultHistory(VAULT_CLEAR_ENDPOINT,{identity:resolvedIdentity});
  if(result.ok){
    HISTORY_SYNC_STATE.lastScope='';
    HISTORY_SYNC_STATE.lastVaultMode='';
    HISTORY_SYNC_STATE.lastUserId='';
  }
  return result.ok;
}

function formatHistoryDate(iso){
  if(!iso) return '';
  const d=new Date(iso);
  if(Number.isNaN(d.getTime())) return '';
  const yy=d.getFullYear();
  const mm=String(d.getMonth()+1).padStart(2,'0');
  const dd=String(d.getDate()).padStart(2,'0');
  const hh=String(d.getHours()).padStart(2,'0');
  const mi=String(d.getMinutes()).padStart(2,'0');
  return `${yy}.${mm}.${dd} ${hh}:${mi}`;
}

function getCurrentInputSnapshot(){
  return{
    fullname:document.getElementById('f-fullname')?.value?.trim()||'',
    gender:GENDER,
    year:parseInt(document.getElementById('f-year')?.value,10)||null,
    month:parseInt(document.getElementById('f-month')?.value,10)||null,
    day:getSelectedBirthDay(),
    hour:getSelectedBirthHour(),
    cat:document.getElementById('f-cat')?.value||'総合',
    theme:document.getElementById('f-theme')?.value?.trim()||'',
    reactionAnswers:getReactionAnswersSnapshot(),
  };
}

function analyzeConsultationFocus(cat='',theme=''){
  const raw=`${cat||''} ${theme||''}`;
  const hasLove=/恋愛|結婚|彼氏|彼女|交際|相手|別れ|別れる|復縁|パートナー|夫|妻/.test(raw)||cat==='恋愛';
  const hasWork=/仕事|転職|職場|会社|上司|キャリア|退職|辞め|勤務|収入|お金|金銭|働き方/.test(raw)||cat==='仕事'||cat==='金運';
  const needsRelationshipDecision=/続けるべき|別れるべき|別れ|距離を置|交際/.test(raw);
  const needsCareerDecision=/続けるべき|転職|辞める|退職|働き方/.test(raw)||cat==='仕事';
  const needsDecision=/判断|決め|迷|選べ/.test(raw)||needsRelationshipDecision||needsCareerDecision;
  const isDualConcern=hasLove&&hasWork;
  const shortLabel=isDualConcern?'恋愛と仕事':hasLove?'恋愛':hasWork?'仕事':(cat||'今の悩み');
  const answerNeed=isDualConcern
    ?'恋愛と仕事を混ぜずに、それぞれの判断軸を分けて整理してほしい'
    :hasLove
      ?'関係を続けるか距離を取るかの判断材料がほしい'
      :hasWork
        ?'今の仕事を続けるか切り替えるかの判断材料がほしい'
        :'いま何を優先して整えるべきかを知りたい';
  const dossierTitle=isDualConcern
    ?'恋愛と仕事の分かれ目に立つときの鑑定書'
    :hasLove
      ?'関係を見極めるための鑑定書'
      :hasWork
        ?'働き方を見直すための鑑定書'
        :'いまの進路を整えるための鑑定書';
  return{
    raw,
    hasLove,
    hasWork,
    needsRelationshipDecision,
    needsCareerDecision,
    needsDecision,
    isDualConcern,
    shortLabel,
    answerNeed,
    dossierTitle,
  };
}

function buildDecisionSupportPromptGuide(cat='',theme=''){
  const focus=analyzeConsultationFocus(cat,theme);
  const lines=[
    `【相談者が欲しい答え】`,
    `相談者が本当に欲しいのは「${focus.answerNeed}」という実感です。`,
    `出力の冒頭1〜2文で、この問いに対して「進む・止まる・様子を見る」のいずれかが伝わる形で言い切ること。`,
    '',
    `【判断材料の具体化ルール】`,
    '- 「〜かもしれません」「〜の可能性があります」は禁止。「〜になりやすい」「〜という状況です」と断言する',
    '- 「気持ちを大切に」「自分を信じて」などの精神論は禁止。現実的な行動と判断軸に変換する',
    '- カードの説明、並び、流派名、位置関係、システム説明は一切出さない',
    '- 読み手は占いに詳しくない前提で、普通の日本語だけで腹落ちさせる',
    '- 抽象的な「良い変化」ではなく「具体的に何が・いつ・どうなりやすいか」を書く',
    '- 行動指示は「〜する」「〜を確認する」「〜を止める」のように動詞で完結させる',
  ];
  if(focus.isDualConcern){
    lines.push('- 恋愛と仕事が同時に出てくる場合は、必ず論点を「恋愛では〜、仕事では〜」と分けて書く');
  }
  if(focus.needsDecision){
    lines.push('- 「何を確認してから決めるか」を具体的な確認事項として2〜3個書く');
    lines.push('- 判断の分かれ目（進むべき条件 vs 止まるべき条件）を明記する');
  }
  return lines.join('\n');
}

const LEN_FALLBACK_GROUPS={
  hidden:[6,7,14,26,32],
  ending:[8,10,17,36],
  stability:[4,25,30,35],
  value:[15,34,35],
  relationship:[24,25,28,29,30],
  burden:[11,19,21,23,36],
  support:[9,16,18,31,33],
  choice:[12,20,22,27],
};

function hasLenGroup(ids,groupKey){
  const group=LEN_FALLBACK_GROUPS[groupKey]||[];
  return ids.some(id=>group.includes(id));
}

function getLenCoreFocusText(id){
  switch(id){
    case 34:return 'いまの核心は、気持ちの強さよりも「釣り合い」と「自立」をどう扱うかにあります。';
    case 35:return 'いまの核心は、安心を守りたい気持ちが強いぶん、変化の判断を先延ばしにしやすい点にあります。';
    case 26:return 'いまの核心は、まだ見えていない事実や、言葉にできていない本音が残っていることです。';
    case 8:return 'いまの核心は、今の形のままでは続けにくく、終わらせ方や切り替え方を考える段階に入っていることです。';
    case 24:return 'いまの核心は、気持ちが強いぶん、冷静な判断が後回しになりやすいことです。';
    case 25:return 'いまの核心は、関係や約束を続ける意味をもう一度確かめ直す必要があることです。';
    case 21:return 'いまの核心は、感情ではなく現実の壁がはっきり存在していることです。';
    case 22:return 'いまの核心は、選べないこと自体が今の消耗の原因になっていることです。';
    case 31:return 'いまの核心は、前に進む力はあるのに、どこへ使うか決め切れていないことです。';
    case 32:return 'いまの核心は、気分や自尊心の揺れが判断に強く影響していることです。';
    case 33:return 'いまの核心は、答えの輪郭は見えているのに、最後の確認が足りないことです。';
    case 6:return 'いまの核心は、不安が大きくなりすぎて、状況を必要以上に複雑に見てしまっていることです。';
    default:
      if([15,34].includes(id)) return 'いまの核心は、お金・役割・自立の問題が無視できないところまで来ていることです。';
      if([24,25,30].includes(id)) return 'いまの核心は、情とつながり方の見直しにあります。';
      if([8,10,17].includes(id)) return 'いまの核心は、変化や区切りを避けて通れないところにあります。';
      return 'いまの核心は、気持ちだけで決めず、条件整理を先にしたほうがよい段階にあることです。';
  }
}

function buildThemeSpecificActionPlan(focus){
  if(focus.isDualConcern){
    return[
      '恋愛と仕事を同じ紙に混ぜず、別ページで「続ける理由」「離れる・変える理由」を3つずつ書く。',
      '恋愛では「不安を話したときに向き合える相手か」、仕事では「半年後に自分の価値が上がるか」を基準に見直す。',
      '今週はどちらか一方だけでも、相手への確認か求人確認のどちらかを実際に1つ進める。'
    ];
  }
  if(focus.hasLove){
    return[
      '感情が静かな時間に、続けたい理由と不安な点を3つずつ書き出す。',
      '相手に確認したいことを1つに絞り、遠回しにせず言葉にする。',
      '答えを急がず、会話後の安心感が増えるか減るかで判断する。'
    ];
  }
  if(focus.hasWork){
    return[
      '今の仕事を続ける利点と、離れた場合に得られるものを数字や条件で書き出す。',
      '現職で改善したいことを1つ決め、上司や同僚に相談するか自分で変えるかを決める。',
      '今週中に転職情報を1件だけ見て、逃げではなく比較材料を増やす。'
    ];
  }
  return[
    'いちばん気になっている問題を1つに絞り、「このまま続けた場合」と「切り替えた場合」を書き分ける。',
    '気持ちの整理と条件整理を分けて考え、同じ日に両方決めようとしない。',
    '今週は確認すべき相手か情報を1つ決め、実際に動く。'
  ];
}

function buildThirtyDayActionPlan(focus){
  if(focus.isDualConcern){
    return[
      '恋愛と仕事の判断軸を固定し、毎週同じ基準で見直す。',
      '相手との会話結果と仕事の比較材料を一つのメモに集め、感情だけで上書きしない。',
      '一か月後に「残るなら何を改善するか」「離れるなら何から始めるか」を決める。'
    ];
  }
  if(focus.hasLove){
    return[
      '関係を続ける条件を3つに絞り、毎回その基準で会話後の気持ちを見直す。',
      '曖昧なまま流しているテーマを一つずつ言葉にする。',
      '一か月後に、安心感が増えたか減ったかで次の判断をする。'
    ];
  }
  if(focus.hasWork){
    return[
      '現職に残る条件と、転職する条件を同じ基準で比較できる形に整える。',
      '求人・相談・現職の改善案の三つを同時に集め、逃げ道ではなく比較材料を増やす。',
      '一か月後に、残るか動くかを感情ではなく条件で決める。'
    ];
  }
  return[
    '迷いを生む論点を一つに絞り、毎週同じ基準で見直す。',
    '確認した情報と感情の変化を分けて記録する。',
    '一か月後に、残すものと手放すものを決める。'
  ];
}

function buildDossierWarnings(focus){
  if(focus.isDualConcern){
    return[
      '恋愛と仕事を同じ気分で一気に決めない',
      '不安が強い日に結論まで出そうとしない',
      '相手や職場の反応を想像だけで決めつけない'
    ];
  }
  if(focus.hasLove){
    return[
      '寂しさを関係の価値と取り違えない',
      '話し合いを避けたまま希望だけで残らない',
      '相手の沈黙を都合よく解釈しない'
    ];
  }
  if(focus.hasWork){
    return[
      '疲れた勢いだけで辞めると決めない',
      '現職の不満を曖昧なまま転職先に期待しすぎない',
      '条件を比べる前に自己否定しない'
    ];
  }
  return[
    '不安だけで今日の結論を固定しない',
    '考えすぎた日に大きな判断をしない',
    '相手や環境の反応を想像だけで決めない'
  ];
}

function buildDossierLuck(focus){
  if(focus.isDualConcern){
    return[
      '話しづらいことを言葉にできた日',
      '比較材料が増えて気持ちが静かになったとき',
      'どちらか一方だけでも前に進めた実感'
    ];
  }
  if(focus.hasLove){
    return[
      '会話後に安心感が増えたとき',
      '我慢ではなく本音を出せたとき',
      '相手の反応で迷いが減ったとき'
    ];
  }
  if(focus.hasWork){
    return[
      '条件比較が数字で見えてきたとき',
      '仕事の負担と見返りを冷静に書けたとき',
      '相談後に選択肢が増えたとき'
    ];
  }
  return[
    '迷いの正体を言葉にできたとき',
    '確認すべきことが一つに絞れたとき',
    '気分ではなく条件で見直せたとき'
  ];
}

function buildDossierKeywords(focus){
  const base=[focus.shortLabel,'条件整理','本音の言語化','優先順位','判断軸'];
  return Array.from(new Set(base)).join(' / ');
}

function splitSections(text=''){
  return String(text||'')
    .replace(/\r\n?/g,'\n')
    .split(/\n(?=■\s*)/)
    .map(section=>section.trim())
    .filter(Boolean);
}

function getSectionBody(text='',index=0){
  const section=splitSections(text)[index]||'';
  return section.replace(/^■[^\n]*\n?/,'').trim();
}

function parseStructuredSection(section=''){
  const normalized=String(section||'').trim();
  const match=normalized.match(/^■\s*([^\n]+)\n?([\s\S]*)$/);
  return{
    title:(match?match[1]:'').trim(),
    body:(match?match[2]:normalized).trim(),
  };
}

function splitReadingBlocks(text=''){
  return String(text||'')
    .replace(/\r\n?/g,'\n')
    .split(/\n{2,}/)
    .map(block=>block.trim())
    .filter(Boolean);
}

function stripListMarker(line=''){
  return String(line||'').replace(/^(\d+[\.\)]|[-・])\s*/,'').trim();
}

function isListBlock(block=''){
  const lines=String(block||'').split('\n').map(line=>line.trim()).filter(Boolean);
  return lines.length>1&&lines.every(line=>/^(\d+[\.\)]|[-・])\s*/.test(line));
}

function renderStructuredBlocksHTML(text=''){
  return splitReadingBlocks(text).map(block=>{
    if(isListBlock(block)){
      const items=block.split('\n').map(line=>stripListMarker(line)).filter(Boolean);
      return `<div class="reading-rich-list">${items.map(item=>`<div class="reading-rich-list-item">${escapeHtml(item)}</div>`).join('')}</div>`;
    }
    return `<p>${escapeHtml(block).replace(/\n/g,'<br>')}</p>`;
  }).join('');
}

function buildReadingBodyParts(text='',withLead=false){
  const blocks=splitReadingBlocks(text);
  let leadHTML='';
  if(withLead&&blocks.length&&!isListBlock(blocks[0])){
    leadHTML=`<div class="reading-rich-lead">${escapeHtml(blocks.shift()).replace(/\n/g,'<br>')}</div>`;
  }
  return{
    leadHTML,
    bodyHTML:blocks.map(block=>{
      if(isListBlock(block)){
        const items=block.split('\n').map(line=>stripListMarker(line)).filter(Boolean);
        return `<div class="reading-rich-list">${items.map(item=>`<div class="reading-rich-list-item">${escapeHtml(item)}</div>`).join('')}</div>`;
      }
      return `<p>${escapeHtml(block).replace(/\n/g,'<br>')}</p>`;
    }).join('')
  };
}

function buildFormattedReadingMarkup(text='',kind='default'){
  const configs={
    len:{kicker:'',title:'ルノルマンカード鑑定'},
    orc:{kicker:'',title:'オラクルカード鑑定'},
    foundationdeep:{kicker:'',title:'基礎鑑定'},
    integration:{kicker:'',title:'いまの答え'},
    default:{kicker:'',title:'鑑定結果'},
  };
  const config=configs[kind]||configs.default;
  const sections=splitSections(text);
  if(!sections.length){
    const body=buildReadingBodyParts(text,true);
    return `<div class="reading-rich-shell kind-${kind}">
      <div class="reading-rich-hero">
        ${config.kicker?`<div class="reading-rich-kicker">${config.kicker}</div>`:''}
        <div class="reading-rich-title">${escapeHtml(config.title)}</div>
        ${body.leadHTML}
        ${body.bodyHTML?`<div class="reading-rich-copy">${body.bodyHTML}</div>`:''}
      </div>
    </div>`;
  }
  const parsedSections=sections.map(parseStructuredSection);
  const hero=parsedSections[0]||{title:'',body:text};
  const heroBody=buildReadingBodyParts(hero.body,true);
  const detailCards=parsedSections.slice(1).map(section=>{
    const bodyHTML=renderStructuredBlocksHTML(section.body);
    return `<div class="reading-rich-card">
      <div class="reading-rich-card-title">${escapeHtml(section.title||config.title)}</div>
      <div class="reading-rich-card-body">${bodyHTML}</div>
    </div>`;
  }).join('');
  return `<div class="reading-rich-shell kind-${kind}">
    <div class="reading-rich-hero">
      ${config.kicker?`<div class="reading-rich-kicker">${config.kicker}</div>`:''}
      <div class="reading-rich-title">${escapeHtml(hero.title||config.title)}</div>
      ${heroBody.leadHTML}
      ${heroBody.bodyHTML?`<div class="reading-rich-copy">${heroBody.bodyHTML}</div>`:''}
    </div>
    ${detailCards?`<div class="reading-rich-grid">${detailCards}</div>`:''}
  </div>`;
}

function buildFoundationSummaryMarkup(text=''){
  const sections=splitSections(text);
  const parsedSections=(sections.length?sections:[text]).map(parseStructuredSection);
  const flowLabels=['名前から見える傾向','生まれから見える傾向','魂の本質診断から見える傾向'];
  return `
    <div class="foundation-flow">
      ${flowLabels.map((label,index)=>`<div class="foundation-flow-step">STEP ${String(index+1).padStart(2,'0')} ${escapeHtml(label)}</div>`).join('')}
    </div>
    <div class="foundation-grid">
      ${parsedSections.map((section,index)=>`
        <div class="foundation-card">
          <div class="foundation-card-step">STEP ${String(index+1).padStart(2,'0')}</div>
          <div class="foundation-card-title">${escapeHtml(section.title||flowLabels[index]||'基礎鑑定')}</div>
          <div class="foundation-card-body">${renderStructuredBlocksHTML(section.body||section.title||text)}</div>
        </div>
      `).join('')}
    </div>`;
}

function renderFormattedResultText(id,text,kind='default'){
  const el=document.getElementById(id);
  if(!el) return;
  const normalized=String(text||'')
    .replace(/\r\n?/g,'\n')
    .replace(/\n{3,}/g,'\n\n')
    .trim();
  el.classList.add('formatted-output');
  if(!normalized){
    el.innerHTML='';
    return;
  }
  el.innerHTML=kind==='foundation'
    ?buildFoundationSummaryMarkup(normalized)
    :buildFormattedReadingMarkup(normalized,kind);
}

function buildReadingOutputFormatGuide(kind='len'){
  if(kind==='len'){
    return [
      '【出力形式・厳守事項】',
      '見出しは必ず次の順で固定してください。',
      '',
      '■ 今の流れ',
      '▶ 最初の1文で「今の状況はどういう状態か」を断言する（例：「今は○○な流れにいます」「現状、○○が起きやすい状態です」）。',
      '▶ 2文目で「その背景にある理由」または「転換点」を添える。',
      '▶ 3文目以降は必要なら続けてよいが、脱線・前置き・比喩は禁止。',
      '',
      '■ 気をつけること',
      '▶ 最初の1文で「具体的なリスクまたは落とし穴」を断言する（例：「このまま○○すると〜になりやすい」）。',
      '▶ ネガティブカードが出ているなら警告として前面に出す。「〜かもしれない」で逃げない。',
      '▶ 改善・好転の兆しが見えるなら「一方で〜という流れもある」とセットで必ず伝える。',
      '',
      '■ 次にやること',
      '▶ 今日から7日以内にできる行動を3つ以内、箇条書きにする。',
      '▶ 各行動は「〜する」「〜を確認する」「〜を止める」のように動詞で完結させる。',
      '▶ 「気持ちを整える」「自分を信じる」などの精神論は禁止。現実に動けること・確認できることだけを書く。',
      '▶ 状況別に書く場合は「もし○○なら〜する」の形にする。',
    ].join('\n');
  }
  if(kind==='orc'){
    return [
      '【出力形式・厳守事項】',
      '見出しは必ず次の順で固定してください。',
      '',
      '■ 今の気持ち',
      '▶ 最初の1文で「今の感情・状態の核心」を断言する（例：「今は○○という状態にいます」）。',
      '▶ 感情の流れと「なぜそこにいるか」を2〜3文で整理する。前置きや比喩は禁止。',
      '',
      '■ 魂の本質',
      '▶ 魂の本質診断のsummaryとstressを最優先で使い、「この人の根っこにある性質」を1〜2文で断言する。',
      '▶ 「〜な傾向があります」ではなく「〜という性質を持っています」と言い切る。',
      '▶ 今の悩みや引っかかりとその性質の関係を具体的に結びつける。',
      '',
      '■ 次にとる行動',
      '▶ カードのメッセージを「今週やること」に変換して2〜3個書く。',
      '▶ 各行動は「〜する」「〜を試す」「〜をやめる」のように動詞で完結させる。',
      '▶ 「心がけて」「意識して」「感じて」などの抽象動詞は禁止。',
    ].join('\n');
  }
  if(kind==='integration'){
    return [
      '【出力形式・厳守事項】',
      '見出しは必ず次の順で固定してください。',
      '',
      '■ 結論',
      '▶ 最初の1〜2文で「進む・止まる・様子を見る」のどれかを断言する。曖昧にしない。',
      '▶ 結論は「なぜそうなのか」を一言で支える根拠もセットで書く。',
      '',
      '■ 判断ポイント',
      '▶「進んでよい条件」と「止まるべき条件」を分けて書く。',
      '▶ 条件は「○○が確認できたら進む」「○○が起きたら止まる」の形で具体的に書く。',
      '▶ 抽象的な「気持ちの変化」ではなく、現実の状況・言葉・出来事を条件にする。',
      '',
      '■ 次にやること',
      '▶ 今日から7日以内にやることを3つまで、1行ずつ書く。',
      '▶ 各行を動詞で完結させる。精神論・励ましは禁止。',
    ].join('\n');
  }
  if(kind==='foundationdeep'){
    return [
      '【出力形式】',
      '見出しは必ず次の順で固定してください。',
      '■ 背景と現状',
      '■ 強みとして使えること',
      '■ つまずきやすい点',
      '■ 土台を整えるヒント',
      '相談テーマに必ず接続し、占術名や専門用語を出さずに自然な日本語でまとめてください。',
      '読み手が「自分の扱い方が分かった」と感じる密度にし、抽象論や慰めだけの文章にしないでください。'
    ].join('\n');
  }
  return '';
}

function buildFoundationSummaryOutput(){
  const namePlain=buildNamePlainInsight(NAMEJUDGE);
  const birthPlain=buildBirthPlainInsight(MEIMEI);
  const reactionLines=REACTION_PROFILE
    ?[
      REACTION_PROFILE.summary,
      `反応が出やすい場面：${REACTION_PROFILE.stress}`,
      `力が出やすい動き：${REACTION_PROFILE.power}`,
      REACTION_PROFILE.handling,
    ]
    :[
      '魂の本質診断がまだ未入力のため、この段階は簡易表示です。',
      '診断を入力すると、ストレスが出やすい場面と整いやすい条件まで補足できます。'
    ];
  const sections=[
    {
      title:'名前から見える傾向',
      body:namePlain
        ?[namePlain.overview,namePlain.timing,namePlain.advice].filter(Boolean).join('\n\n')
        :'名前が未入力のため、この部分は今回は省略しています。名前を入れると、人への伝わり方と対人面の傾向を補足できます。'
    },
    {
      title:'生まれから見える傾向',
      body:birthPlain
        ?[birthPlain.overview,birthPlain.timing,birthPlain.advice].filter(Boolean).join('\n\n')
        :'生まれの情報が不足しているため、この部分は今回は簡易表示です。生年と生月が入ると、流れの癖と力の出し方を整理できます。'
    },
    {
      title:'魂の本質診断',
      body:reactionLines.filter(Boolean).join('\n\n')
    }
  ];
  return sections.map(section=>`■ ${section.title}\n${section.body}`).join('\n\n');
}

function joinCompactSentences(...parts){
  return parts.flat().map(part=>String(part||'').trim()).filter(Boolean).join(' ');
}

function summarizeInsightCards(cards=[],limit=2){
  return (cards||[])
    .slice(0,limit)
    .map(item=>`${item.title}：${item.body}`)
    .join(' / ');
}

function getInsightCardBody(cards=[],kicker=''){
  return (cards||[]).find(item=>item.kicker===kicker)?.body||'';
}

function buildFoundationDeepSourceContext(){
  const input=getCurrentInputSnapshot();
  const focus=analyzeConsultationFocus(input.cat,input.theme);
  const birthPlain=buildBirthPlainInsight(MEIMEI);
  const birthProfile=buildMeimeiInsights(MEIMEI);
  const namePlain=buildNamePlainInsight(NAMEJUDGE);
  const nameProfile=buildNameJudgeInsights(NAMEJUDGE);
  const reaction=REACTION_PROFILE;
  const lifeText=buildLifePatternPlainText();

  const meimeiText=MEIMEI
    ?[
      birthPlain?[birthPlain.overview,birthPlain.timing,birthPlain.advice].filter(Boolean).join(' '):'',
      MEIMEI.mode==='partial'
        ?`年月候補: 年柱 ${(MEIMEI.yearCandidates||[]).map(item=>item.key).join(' / ')||'なし'} / 月柱 ${(MEIMEI.monthCandidates||[]).map(item=>item.key).join(' / ')||'なし'}`
        :`命式メモ: 日主 ${MEIMEI.dm} / 身強弱 ${MEIMEI.strengthLabel} / 優勢五行 ${formatElementRanking(MEIMEI.cnt,2)||'なし'} / 補うと整いやすい要素 ${(MEIMEI.favorableElements||[]).join('・')||'なし'}`,
      birthProfile?.core?`詳細メモ: ${birthProfile.core}`:'',
      birthProfile?.timing?`流れのメモ: ${birthProfile.timing}`:'',
      birthProfile?.advice?`整え方: ${birthProfile.advice}`:'',
      birthProfile?.note?`補足: ${birthProfile.note}`:'',
      summarizeInsightCards(birthProfile?.insightCards)?`四柱推命の補足: ${summarizeInsightCards(birthProfile?.insightCards)}`:'',
    ].filter(Boolean).join('\n')
    :'なし';

  const nameText=NAMEJUDGE
    ?[
      namePlain?[namePlain.overview,namePlain.timing,namePlain.advice].filter(Boolean).join(' '):'',
      `主要格: 人格${NAMEJUDGE.kakus[1].num}画(${getKakuLuck(NAMEJUDGE.kakus[1].num).lbl}) / 地格${NAMEJUDGE.kakus[2].num}画(${getKakuLuck(NAMEJUDGE.kakus[2].num).lbl}) / 外格${NAMEJUDGE.kakus[3].num}画(${getKakuLuck(NAMEJUDGE.kakus[3].num).lbl}) / 総格${NAMEJUDGE.kakus[4].num}画(${getKakuLuck(NAMEJUDGE.kakus[4].num).lbl})`,
      nameProfile?.core?`詳細メモ: ${nameProfile.core}`:'',
      nameProfile?.timing?`対人や立ち上がりのメモ: ${nameProfile.timing}`:'',
      nameProfile?.advice?`長期で活きる形: ${nameProfile.advice}`:'',
      nameProfile?.threeTalent?`三才: ${nameProfile.threeTalent.pattern} / ${nameProfile.threeTalent.summary}`:'',
      nameProfile?.yinYang?`陰陽: ${nameProfile.yinYang.summary}`:'',
      nameProfile?.splitNote?`補足: ${nameProfile.splitNote}`:'',
      summarizeInsightCards(nameProfile?.insightCards)?`姓名判断の補足: ${summarizeInsightCards(nameProfile?.insightCards)}`:'',
    ].filter(Boolean).join('\n')
    :'なし';

  const reactionText=reaction
    ?[
      `要約: ${reaction.summary}`,
      `反応が出やすい場面: ${reaction.stress}`,
      `力が出やすい動き: ${reaction.power}`,
      `扱い方のメモ: ${reaction.handling}`,
      reaction.evidence?.length?`回答根拠: ${reaction.evidence.join(' / ')}`:'',
      `誕生日から見える行動の癖: ${lifeText}`,
    ].filter(Boolean).join('\n')
    :[
      '魂の本質診断は未入力のため簡易表示です。',
      `誕生日から見える行動の癖: ${lifeText}`,
    ].filter(Boolean).join('\n');

  return{
    input,
    focus,
    contextText:`【相談者】${input.fullname||'あなた'}さん
【相談テーマ】${input.cat||'総合'}「${input.theme||'全般'}」
【相談者が求めている答え】${focus.answerNeed}

【姓名判断】
${nameText}

【四柱推命】
${meimeiText}

【魂の本質診断】
${reactionText}

【基礎鑑定の要約】
${LAST_OUTPUTS.about||buildFoundationSummaryOutput()}`,
  };
}

function buildFoundationDeepFallback(){
  const input=getCurrentInputSnapshot();
  const focus=analyzeConsultationFocus(input.cat,input.theme);
  const birthPlain=buildBirthPlainInsight(MEIMEI);
  const birthProfile=buildMeimeiInsights(MEIMEI);
  const namePlain=buildNamePlainInsight(NAMEJUDGE);
  const nameProfile=buildNameJudgeInsights(NAMEJUDGE);
  const reaction=REACTION_PROFILE;
  const lifeText=buildLifePatternPlainText();

  const backgroundAndCurrent=joinCompactSentences(
    `${input.fullname||'あなた'}さんは、${focus.shortLabel}の場面で感情だけで決めるより、自分が納得できる筋道が見えたときに力を出しやすいタイプです。`,
    birthPlain?.overview,
    namePlain?.overview,
    reaction?.summary?`反応面では、${reaction.summary}`:'魂の本質診断は未入力のため、この部分は簡易表示です。',
    birthPlain?.timing,
    namePlain?.timing,
    reaction?.stress?`今の悩みでは、${reaction.stress} 場面で揺れやすくなります。`:'',
    /使っていません。$/.test(lifeText)?'':`動き方の癖としては、${lifeText}`
  )||'いまは答えそのものを急ぐより、自分に合う進め方を先に整えるほど判断がぶれにくくなります。';

  const strengths=joinCompactSentences(
    birthProfile?.advice||birthPlain?.advice,
    namePlain?.advice,
    reaction?.power?`行動面では、${reaction.power} 形だと本来の力が出やすいです。`:'',
    reaction?.handling?`落ち着いて取り組めるのは、${reaction.handling}`:''
  )||'強みは、無理に答えを急がず、自分に合う順番で整理すると安定して力が出る点です。';

  const risks=joinCompactSentences(
    getInsightCardBody(birthProfile?.insightCards,'RISK'),
    getInsightCardBody(nameProfile?.insightCards,'SOCIAL'),
    reaction?.stress?`特に ${reaction.stress} 状況では判断がぶれやすくなります。`:'',
    reaction?.handling?`そのまま抱え込むと、${reaction.handling}`:''
  )||'つまずきやすいのは、疲れた状態で結論だけを急ぎ、自分に合う進め方を飛ばしてしまうときです。';

  const guidance=joinCompactSentences(
    `今回の${focus.shortLabel}では、正解探しよりも「自分が無理なく続けられる形」を先に決めるほうが結果が安定します。`,
    birthProfile?.advice||birthPlain?.advice,
    nameProfile?.advice||namePlain?.advice,
    reaction?.handling?`感情の扱い方は、${reaction.handling}`:'',
    reaction?.power?`動くときは、${reaction.power} を意識すると噛み合いやすくなります。`:''
  )||'まずは自分に合う進め方を整え、そのうえで小さく動く順番を作るのがいちばん堅実です。';

  return[
    `■ 今の流れ\n${backgroundAndCurrent}`,
    `■ 使える強み\n${strengths}`,
    `■ 気をつけること\n${risks}`,
    `■ 整え方\n${guidance}`,
  ].join('\n\n');
}

function buildCurrentReadingRecord(){
  const existing=getReadingHistory().find(r=>r.id===CURRENT_READING_ID);
  return{
    id:CURRENT_READING_ID||('rd_'+Date.now().toString(36)),
    createdAt:(existing&&existing.createdAt)||CURRENT_READING_CREATED_AT||new Date().toISOString(),
    updatedAt:new Date().toISOString(),
    plan:PLAN,
    memberSnapshot:isMemberActive(),
    input:getCurrentInputSnapshot(),
    meimei:MEIMEI,
    lp:LP,
    nameJudge:NAMEJUDGE,
    reactionProfile:REACTION_PROFILE?JSON.parse(JSON.stringify(REACTION_PROFILE)):null,
    selLen:[...SEL_LEN],
    selOrc:[...SEL_ORC],
    fixedGenderCard:FIXED_GENDER_CARD,
    clarifyAnswers:CLARIFY_ANSWERS,
    outputs:JSON.parse(JSON.stringify(LAST_OUTPUTS)),
  };
}

function getImageDetail(taskKey=''){
  if(taskKey&&IMAGE_DETAIL_CONFIG[taskKey]) return IMAGE_DETAIL_CONFIG[taskKey];
  return PLAN==='paid'?IMAGE_DETAIL_CONFIG.paid:IMAGE_DETAIL_CONFIG.free;
}

function buildCardImageRefs(kind='all',taskKey=''){
  const detail=getImageDetail(taskKey);
  const refs=[];
  if(kind==='all'||kind==='len'){
    SEL_LEN.forEach((id,index)=>{
      refs.push({
        path:`images/lenormand/${String(id).padStart(2,'0')}.png`,
        detail,
        label:`ルノルマン ${index+1}枚目 No.${id} ${LENORMAND[id]?.name||''}`,
      });
    });
  }
  if(kind==='all'||kind==='orc'){
    SEL_ORC.forEach((id,index)=>{
      refs.push({
        path:`images/oracle/${String(id).padStart(2,'0')}.png`,
        detail,
        label:`オラクル ${index+1}枚目 No.${id} ${ORACLE[id]?.name||''}`,
      });
    });
  }
  return refs;
}

function persistCurrentReading(){
  if(!CURRENT_READING_ID) return;
  const record=buildCurrentReadingRecord();
  const history=getReadingHistory().filter(r=>r.id!==CURRENT_READING_ID);
  history.unshift(record);
  history.sort((a,b)=>new Date(b.updatedAt||b.createdAt||0)-new Date(a.updatedAt||a.createdAt||0));
  setReadingHistory(history);
  renderHomeVault();
  void saveHistoryRecordToVault(record);
}

function computeReadingStats(history){
  const lenCounts={};
  const orcCounts={};
  const catCounts={};
  history.forEach(record=>{
    (record.selLen||[]).forEach(id=>{lenCounts[id]=(lenCounts[id]||0)+1;});
    (record.selOrc||[]).forEach(id=>{orcCounts[id]=(orcCounts[id]||0)+1;});
    const cat=record.input?.cat||'総合';
    catCounts[cat]=(catCounts[cat]||0)+1;
  });
  const pickTop=(counts,labelMap)=>Object.entries(counts)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,3)
    .map(([id,count])=>`${labelMap(id)} ×${count}`)
    .join(' / ');

  const uniqueDates=[...new Set(history.map(r=>{
    const d=new Date(r.createdAt||r.updatedAt||Date.now());
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }))];
  let streak=0;
  if(uniqueDates.length){
    let cursor=new Date(uniqueDates[0]+'T00:00:00');
    for(const dateStr of uniqueDates){
      const target=new Date(dateStr+'T00:00:00');
      if(target.getTime()===cursor.getTime()){
        streak++;
        cursor.setDate(cursor.getDate()-1);
      }
    }
  }

  return{
    total:history.length,
    paidCount:history.filter(r=>r.plan==='paid').length,
    topLen:pickTop(lenCounts,id=>`No.${id} ${LENORMAND[id]?.name||id}`),
    topOrc:pickTop(orcCounts,id=>`No.${id} ${ORACLE[id]?.name||id}`),
    topCat:Object.entries(catCounts).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([cat,count])=>`${cat} ×${count}`).join(' / '),
    streak,
  };
}

function renderHomeVault(){
  safeRun('renderTopHeroPanels',()=>renderTopHeroPanels());
  safeRun('renderRecentHistory',()=>renderRecentHistory());
  safeRun('renderPatternSummary',()=>renderPatternSummary());
  safeRun('renderMemberStatusBlock',()=>renderMemberStatusBlock(),()=>renderMemberStatusFallback());
  safeRun('renderPremiumEntrySection',()=>renderPremiumEntrySection(),()=>renderPremiumEntryFallback());
}

function renderMemberStatusFallback(){
  const el=document.getElementById('member-status-block');
  if(!el) return;
  el.innerHTML=`
    <div class="member-state inactive">Googleログイン / Stripe登録</div>
    <div class="vault-desc">会員になると、読み返し・記録・深掘り鑑定の導線がここに並びます。ローカル試験中ならそのまま有料導線の確認もできます。</div>
    <div class="member-benefits">
      <div class="member-benefit">前回の続きから再開できる</div>
      <div class="member-benefit">前回との変化を見比べられる</div>
      <div class="member-benefit">鑑定書をPDFやコピーで残せる</div>
    </div>
    <button class="vault-link" type="button" data-member-intent="start-paid" onclick="openMemberAccessModal('start-paid')">会員導線を開く</button>`;
}

function renderPremiumEntryFallback(){
  const el=document.getElementById('premium-entry');
  if(!el) return;
  el.innerHTML=`
    <div class="premium-entry-head">
      <div>
        <div class="premium-entry-eyebrow">深掘り鑑定</div>
        <div class="premium-entry-title">無料で見えた向きを、進路の判断材料まで落とし込む</div>
        <div class="premium-entry-copy">ここから先は、カードの並びと相談内容をもとに「なぜ迷うのか」「何を確かめてから動くべきか」まで深く読みます。記録として残し、あとから読み返せる前提の導線です。</div>
        <div class="premium-entry-meta">
          <div class="premium-entry-pill">月額プラン</div>
          <div class="premium-entry-pill">Googleログイン + Stripe</div>
        </div>
      </div>
    </div>
    <div class="premium-entry-story">
      <div class="premium-entry-story-title">深掘りで増えること</div>
      <div class="premium-entry-story-line">無料版は入口です。深掘りでは、迷いの核心と判断軸をより具体的に残します。</div>
      <div class="premium-entry-story-line">前回の鑑定とのつながりも含めて読み返せるので、同じテーマを毎回ゼロから説明し直さずに済みます。</div>
    </div>
    <div class="premium-entry-grid">
      <div class="premium-entry-summary-card">
        <div class="premium-entry-summary-title">核心まで読む</div>
        <div class="premium-entry-summary-copy">ルノルマンを主軸に、迷いの芯と現実の分岐点まで言葉にします。</div>
      </div>
      <div class="premium-entry-summary-card">
        <div class="premium-entry-summary-title">判断材料を残す</div>
        <div class="premium-entry-summary-copy">その場で楽になるだけでなく、あとから読み返せる形で残します。</div>
      </div>
      <div class="premium-entry-summary-card">
        <div class="premium-entry-summary-title">次の一手が見える</div>
        <div class="premium-entry-summary-copy">気分論ではなく、今日から動ける行動まで絞って返します。</div>
      </div>
    </div>
    <div class="premium-entry-actions">
      <a class="today-cta" href="?flow=paid" data-member-intent="start-paid" onclick="if(window.openMemberAccessModal){openMemberAccessModal('start-paid');return false;}">会員導線を開く</a>
      <a class="premium-entry-subbtn" href="?flow=free" data-flow-target="free" onclick="if(window.startFlow){startFlow('free');return false;}">まずは無料で試す</a>
    </div>`;
}

function renderRecentHistory(){
  const listEl=document.getElementById('recent-history-list');
  const emptyEl=document.getElementById('recent-history-empty');
  const btnEl=document.getElementById('continue-reading-btn');
  if(!listEl||!emptyEl||!btnEl) return;
  const history=getReadingHistory();
  if(!history.length){
    listEl.innerHTML='';
    emptyEl.style.display='block';
    btnEl.style.display='none';
    return;
  }
  emptyEl.style.display='none';
  btnEl.style.display='inline-flex';
  const latestTheme=history[0]?.input?.theme?truncateText(history[0].input.theme,40):'前回のテーマ';
  const latestLead=`
    <div class="vault-insight">
      <div class="vault-insight-label">いちばん新しい記録</div>
      <div class="vault-insight-body">いま一番新しい記録は「${escapeHtml(latestTheme)}」。前回の温度感を引き継いだまま、同じテーマの続きを深く読めます。</div>
    </div>`;
  listEl.innerHTML=latestLead+history.slice(0,3).map(record=>{
    const theme=record.input?.theme?truncateText(record.input.theme,34):'全体の流れ';
    const cardLine=truncateText((record.selLen||[]).map(id=>LENORMAND[id]?.name).filter(Boolean).join('・'),42);
    return`
      <button class="history-item" onclick="openHistoryItem('${record.id}')">
        <div class="history-item-top">
          <span class="history-item-date">${formatHistoryDate(record.createdAt)}</span>
          <span class="history-pill ${record.plan==='paid'?'paid':'free'}">${record.plan==='paid'?'12枚鑑定':'無料鑑定'}</span>
        </div>
        <div class="history-item-title">${escapeHtml(record.input?.cat||'総合')}｜${escapeHtml(theme)}</div>
        <div class="history-item-meta">${escapeHtml(cardLine)}</div>
        <div class="history-item-tail">
          <span>${record.plan==='paid'?'進路まで読んだ記録':'向きを確かめた入口'}</span>
          <span class="history-item-link">続きを読む</span>
        </div>
      </button>`;
  }).join('');
}

function renderPatternSummary(){
  const listEl=document.getElementById('pattern-summary-list');
  const emptyEl=document.getElementById('pattern-summary-empty');
  if(!listEl||!emptyEl) return;
  const history=getReadingHistory();
  if(history.length<2){
    listEl.innerHTML='';
    emptyEl.style.display='block';
    return;
  }
  const stats=computeReadingStats(history);
  emptyEl.style.display='none';
  const rows=[
    ['積み上がり',`${stats.total}回 / 深掘り ${stats.paidCount}回`],
    ['いま多い相談テーマ',stats.topCat||'まだ蓄積中'],
    ['繰り返し出る合図',stats.topLen||'まだ蓄積中'],
    ['背中を押すカード',stats.topOrc||'まだ蓄積中'],
    ['続けて向き合った日数',stats.streak?`${stats.streak}日`:'1日'],
  ];
  const patternLead=`記録は${stats.total}回。いま多いテーマは${truncateText(stats.topCat||'まだ蓄積中',30)}で、読み返すほど相談の軸が見えやすくなっています。`;
  listEl.innerHTML=`
    <div class="vault-insight">
      <div class="vault-insight-label">いま見える傾向</div>
      <div class="vault-insight-body">${escapeHtml(patternLead)}</div>
    </div>
    ${rows.map(([label,value])=>`
    <div class="pattern-row">
      <div class="pattern-label">${escapeHtml(label)}</div>
      <div class="pattern-value">${escapeHtml(value)}</div>
    </div>`).join('')}`;
}

function renderMemberStatusBlock(){
  const el=document.getElementById('member-status-block');
  if(!el) return;
  const statusMeta=getMemberStatusMeta();
  if(isMemberActive()){
    el.innerHTML=`
      <div class="member-state active">${escapeHtml(statusMeta.label)}</div>
      <div class="vault-desc">${escapeHtml(statusMeta.copy)}</div>
      <div class="member-benefits">
        <div class="member-benefit">前回の鑑定からそのまま進路を深掘り</div>
        <div class="member-benefit">前回との変化を見比べられる</div>
        <div class="member-benefit">鑑定書と傾向記録が使うほど育つ</div>
      </div>
      ${statusMeta.action}`;
    return;
  }
  el.innerHTML=`
    <div class="member-state inactive">${escapeHtml(statusMeta.label)}</div>
    <div class="vault-desc">${escapeHtml(statusMeta.copy)}</div>
    <div class="member-benefits">
      <div class="member-benefit">前回の続きから再開できる</div>
      <div class="member-benefit">前回との変化を見比べられる</div>
      <div class="member-benefit">鑑定書をPDFやコピーで残せる</div>
    </div>
    ${statusMeta.action}`;
}

function openLatestHistory(){
  const latest=getReadingHistory()[0];
  if(!latest){
    showToast('まだ保存された鑑定がありません');
    return;
  }
  openHistoryItem(latest.id);
}

function hydrateInputsFromRecord(record){
  const input=record.input||{};
  const fullnameEl=document.getElementById('f-fullname');
  if(fullnameEl) fullnameEl.value=input.fullname||'';
  if(input.gender) setGender(input.gender);
  if(input.year) document.getElementById('f-year').value=input.year;
  if(input.month) document.getElementById('f-month').value=input.month;
  syncDayOptions(input.day??null);
  document.getElementById('f-day').value=input.day==null?'unknown':String(input.day);
  if(input.hour===undefined||input.hour===null) document.getElementById('f-hour').value='unknown';
  else document.getElementById('f-hour').value=String(input.hour);
  if(input.cat) document.getElementById('f-cat').value=input.cat;
  const themeEl=document.getElementById('f-theme');
  if(themeEl) themeEl.value=input.theme||'';
  hydrateReactionInput({reactionAnswers:input.reactionAnswers,reactionProfile:record.reactionProfile||null});
}

function openHistoryItem(id){
  const record=getReadingHistory().find(r=>r.id===id);
  if(!record){
    showToast('保存された鑑定が見つかりません');
    return;
  }
  PLAN=record.plan||'free';
  GENDER=record.input?.gender||'female';
  MEIMEI=record.meimei||null;
  LP=record.lp||null;
  NAMEJUDGE=record.nameJudge||null;
  REACTION_PROFILE=record.reactionProfile||null;
  SEL_LEN=[...(record.selLen||[])];
  SEL_ORC=[...(record.selOrc||[])];
  FIXED_GENDER_CARD=record.fixedGenderCard||null;
  CLARIFY_ANSWERS=record.clarifyAnswers||{};
  CLARIFY_ACTIVE_QUESTIONS=[];
  LAST_OUTPUTS=record.outputs||{about:'',foundationDeep:'',len:'',orc:'',integration:'',followups:{}};
  if(!LAST_OUTPUTS.foundationDeep) LAST_OUTPUTS.foundationDeep='';
  if(!LAST_OUTPUTS.dossier) LAST_OUTPUTS.dossier='';
  if(!LAST_OUTPUTS.followups) LAST_OUTPUTS.followups={};
  CURRENT_READING_ID=record.id;
  CURRENT_READING_CREATED_AT=record.createdAt||new Date().toISOString();
  ACTIVE_FOLLOWUP_KEY=Object.keys(LAST_OUTPUTS.followups||{})[0]||'';
  FOLLOWUP_LOADING=false;
  hydrateInputsFromRecord(record);
  showScreen('s-result',100);
  renderStoredResult();
}

function getResultStageDefs(){
  return PLAN==='paid'?RESULT_STAGE_DEFS_PAID:RESULT_STAGE_DEFS_BASE;
}

function resetResultStageState(status='queued'){
  RESULT_STAGE_STATE={};
  getResultStageDefs().forEach(def=>{
    RESULT_STAGE_STATE[def.key]=status;
  });
}

function setResultStageStatus(key,status){
  if(!key) return;
  if(!(key in RESULT_STAGE_STATE)) RESULT_STAGE_STATE[key]='queued';
  RESULT_STAGE_STATE[key]=status;
  renderResultProgressCard();
}

function buildLoadingInnerMarkup(title,detail=''){
  return `<div class="ai-dots"><span></span><span></span><span></span></div><div class="ai-load-copy"><div class="ai-load-title">${escapeHtml(title)}</div>${detail?`<div class="ai-load-detail">${escapeHtml(detail)}</div>`:''}</div>`;
}

function buildLoadingMarkup(title,detail=''){
  return `<div class="ai-load">${buildLoadingInnerMarkup(title,detail)}</div>`;
}

function setReadingBlockLoading(id,title,detail=''){
  const el=document.getElementById(id);
  if(!el) return;
  el.classList.remove('formatted-output');
  el.innerHTML=buildLoadingMarkup(title,detail);
}

function setIntegrationLoading(title,detail=''){
  const loadEl=document.getElementById('r-aiload');
  const textEl=document.getElementById('r-integration');
  if(loadEl) loadEl.innerHTML=buildLoadingInnerMarkup(title,detail);
  if(loadEl) loadEl.style.display='flex';
  if(textEl){
    textEl.classList.remove('formatted-output');
    textEl.style.display='none';
    textEl.innerHTML='';
  }
}

function getResultProgressSummary(){
  if(RESULT_STAGE_STATE.integration==='working'){
    return{
      title:'カードを統合して結論を整えています',
      copy:'ルノルマン、オラクル、土台情報を重ねて、いま優先する行動まで絞り込んでいます。'
    };
  }
  const parallelKeys=['basic','len','orc'];
  const workingParallel=parallelKeys.filter(key=>RESULT_STAGE_STATE[key]==='working');
  if(workingParallel.length){
    return{
      title:'基礎情報を読み、カードを解釈しています',
      copy:'相談内容に沿って、カードの流れと本人の傾向を別々に読み解いています。'
    };
  }
  return{
    title:'鑑定の準備を整えています',
    copy:'読みやすい順番で結果を並べ、必要な詳細だけあとから開ける形にしています。'
  };
}

function waitMs(ms){
  return new Promise(resolve=>setTimeout(resolve,ms));
}

async function ensureStageMinimumTime(stageKey,startedAt){
  const minMs=RESULT_STAGE_MIN_MS[stageKey]||0;
  const remaining=minMs-(Date.now()-startedAt);
  if(remaining>0) await waitMs(remaining);
}

function renderResultProgressCard(){
  const card=document.getElementById('result-progress-card');
  const titleEl=document.getElementById('result-progress-title');
  const copyEl=document.getElementById('result-progress-copy');
  const stepsEl=document.getElementById('result-progress-steps');
  if(!card||!titleEl||!copyEl||!stepsEl) return;
  if(PLAN==='reader'){
    card.style.display='none';
    return;
  }
  card.style.display='block';
  const summary=getResultProgressSummary();
  titleEl.textContent=summary.title;
  copyEl.textContent=summary.copy;
  stepsEl.innerHTML=getResultStageDefs().map((def,index)=>{
    const status=RESULT_STAGE_STATE[def.key]||'queued';
    const statusLabel=status==='done'?'完了':status==='working'?'進行中':'待機';
    return `<div class="result-progress-step is-${status}">
      <div class="result-progress-step-top">
        <div class="result-progress-step-index">段階 ${String(index+1).padStart(2,'0')}</div>
        <div class="result-progress-step-status">${statusLabel}</div>
      </div>
      <div class="result-progress-step-label">${escapeHtml(def.label)}</div>
      <div class="result-progress-step-copy">${escapeHtml(def.copy)}</div>
    </div>`;
  }).join('');
}

function initializeResultLoadingState(){
  resetResultStageState();
  renderResultProgressCard();
  const progressCard=document.getElementById('result-progress-card');
  if(progressCard) progressCard.style.display='block';
  const shareBtn=document.getElementById('share-x-btn');
  if(shareBtn) shareBtn.style.display='none';
  const dossierSaveBtn=document.getElementById('dossier-save-btn');
  if(dossierSaveBtn) dossierSaveBtn.style.display='none';
  const dossierCopyBtn=document.getElementById('dossier-copy-inline-btn');
  if(dossierCopyBtn) dossierCopyBtn.style.display='none';
  setReadingBlockLoading('r-len-block','いま起きていることを整理しています','迷いを増やす説明ではなく、状況の核心と判断材料だけを言葉にしています。');
  setReadingBlockLoading('r-orc-block','背景と本質を読み解いています','背景の流れと、その人らしい整え方が自然につながるようにまとめています。');
  setIntegrationLoading('結論を整えています','ここまでの読みを一本にまとめ、今どう動くかまで落とし込んでいます。');
}

async function startResultGeneration(){
  initializeResultLoadingState();
  if(PLAN==='paid'){
    await runBasicInfo();
    await runPaidCombinedReading();
    return;
  }
  await Promise.allSettled([
    runBasicInfo(),
    runLenReading(),
    runOrcReading(),
  ]);
  await runIntegration();
}

function renderStoredResult(){
  renderCards();
  renderMeimei();
  renderNameJudge();
  renderReactionProfile();
  if(PLAN==='reader'){
    const progressCard=document.getElementById('result-progress-card');
    if(progressCard) progressCard.style.display='none';
    ['rs-integration'].forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.style.display='none';
    });
    const basisEl=document.getElementById('rs-basis');
    if(basisEl) basisEl.style.display='none';
    document.getElementById('r-len-block').style.display='none';
    document.getElementById('r-orc-block').style.display='none';
    renderReaderRef();
  }else{
    resetResultStageState('done');
    const progressCard=document.getElementById('result-progress-card');
    if(progressCard) progressCard.style.display='none';
    ['rs-integration'].forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.style.display='';
    });
    const basisEl=document.getElementById('rs-basis');
    if(basisEl) basisEl.style.display='';
    document.getElementById('r-len-block').style.display='';
    document.getElementById('r-orc-block').style.display='';
    renderFormattedResultText('r-len-block',LAST_OUTPUTS.len||'','len');
    renderFormattedResultText('r-orc-block',LAST_OUTPUTS.orc||'','orc');
    document.getElementById('r-aiload').style.display='none';
    document.getElementById('r-integration').style.display='block';
    renderFormattedResultText('r-integration',LAST_OUTPUTS.integration||'','integration');
  }
  renderPremiumDossier();
  const shareBtn=document.getElementById('share-x-btn');
  if(shareBtn) shareBtn.style.display='inline-flex';
  const dossierSaveBtn=document.getElementById('dossier-save-btn');
  if(dossierSaveBtn) dossierSaveBtn.style.display=PLAN==='paid'?'inline-flex':'none';
  const dossierCopyBtn=document.getElementById('dossier-copy-inline-btn');
  if(dossierCopyBtn) dossierCopyBtn.style.display=PLAN==='paid'?'inline-flex':'none';
  document.getElementById('progress').style.width='100%';
  renderMemberFollowupSection();
  renderReturnRitual();
  renderResultUpgradePanel();
}

function getCurrentThemeLabel(){
  const input=getCurrentInputSnapshot();
  return input.theme&&input.theme!=='全般'
    ?`${input.cat||'総合'}「${input.theme}」`
    :(input.cat||'総合');
}

function renderResultUpgradePanel(){
  const el=document.getElementById('result-upgrade-panel');
  if(!el) return;
  if(PLAN!=='free'){
    el.style.display='none';
    el.innerHTML='';
    return;
  }
  const themeLabel=getCurrentThemeLabel();
  const items=[
    {kicker:'深く見る',body:'迷いの芯をはっきりさせる。'},
    {kicker:'決めやすくする',body:'進むか止まるかの目印を出す。'},
    {kicker:'残しておく',body:'あとで見返せる形にする。'},
  ];
  el.style.display='block';
  el.innerHTML=`
    <div class="upgrade-head">
      <div>
        <div class="upgrade-badge">深掘り鑑定</div>
        <div class="upgrade-title">続きを見ると、答えがもっとはっきりします</div>
        <div class="upgrade-copy">無料は入口です。${escapeHtml(themeLabel)}を、このまま深く見ると「で、どうするか」まで出せます。</div>
        <div class="upgrade-meta">
          <div class="upgrade-price">
            <div class="upgrade-price-label">料金</div>
            <div class="upgrade-price-value">${escapeHtml(MEMBERSHIP_PLAN.price)}</div>
          </div>
          <div class="upgrade-note">この結果の続きから、そのまま深く読めます。</div>
        </div>
      </div>
      <div class="upgrade-spotlight">
        <div class="upgrade-spotlight-label">無料との違い</div>
        <div class="upgrade-spotlight-value">ふわっと終わらせない</div>
        <div class="upgrade-spotlight-copy">迷いの芯、判断の目印、次の一手までまとめます。</div>
      </div>
    </div>
    <div class="upgrade-list">
      ${items.map(item=>`
        <div class="upgrade-item">
          <div class="upgrade-item-kicker">${escapeHtml(item.kicker)}</div>
          <div class="upgrade-item-body">${escapeHtml(item.body)}</div>
        </div>`).join('')}
    </div>
    <div class="upgrade-actions">
      <button class="nav-btn nav-btn-primary" onclick="upgradeCurrentReadingToPaid()">この続きを深く読む</button>
      <button class="vault-link" onclick="startFlow('paid')">最初から深掘りする</button>
    </div>`;
}

function buildExpandedLenSpreadFromFree(anchorId){
  FIXED_GENDER_CARD=GENDER==='male'?28:(GENDER==='female'?29:null);
  const pool=shuffle(Object.keys(LENORMAND).map(Number).filter(n=>n!==FIXED_GENDER_CARD&&n!==anchorId));
  const extra=pool.slice(0,8);
  return[
    extra[0],extra[1],extra[2],
    extra[3],anchorId,extra[4],
    extra[5],extra[6],extra[7],
  ];
}

function buildExpandedOrcSpreadFromFree(anchorId){
  const pool=shuffle(Array.from({length:33},(_,i)=>i+1).filter(n=>n!==anchorId));
  return[pool[0],anchorId,pool[1]];
}

function canContinueCurrentReadingToPaid(){
  return PLAN==='free'&&SEL_ORC.length===FREE_ORC_COUNT&&(SEL_LEN.length===1||SEL_LEN.length===FREE_LEN_COUNT);
}

function getFreeLenAnchorId(){
  if(SEL_LEN.length===FREE_LEN_COUNT) return SEL_LEN[1];
  return SEL_LEN[0]||null;
}

async function upgradeCurrentReadingToPaid(){
  if(!(await ensurePaidAccess('upgrade-paid'))) return;
  upgradeCurrentReadingToPaidUnlocked();
}

function upgradeCurrentReadingToPaidUnlocked(){
  const fullname=document.getElementById('f-fullname')?.value?.trim()||'（名前未入力）';
  const year=parseInt(document.getElementById('f-year')?.value,10);
  const month=parseInt(document.getElementById('f-month')?.value,10);
  const day=getSelectedBirthDay();
  const hour=getSelectedBirthHour();
  const hasBirth=hasBirthYearMonth(year,month);
  const continueCurrent=canContinueCurrentReadingToPaid();

  if(hasBirth){
    MEIMEI=calcMeimei(year,month,day,hour);
    LP=hasFullBirthDate(year,month,day)?calcLp(year,month,day):null;
    NAMEJUDGE=calcNameJudge(fullname);
  }else if(!MEIMEI){
    showToast('有料鑑定へ進む前に、生年と生月を確認してください');
    showScreen('s-input',20);
    syncDayOptions(day);
    return;
  }

  beginReadingSession();
  PLAN='paid';
  CLARIFY_ANSWERS={};
  CLARIFY_ACTIVE_QUESTIONS=[];
  if(continueCurrent){
    const anchorId=getFreeLenAnchorId();
    if(!anchorId){
      showToast('引いたカードを確認できませんでした。もう一度お試しください');
      gotoTop();
      return;
    }
    SEL_LEN=buildExpandedLenSpreadFromFree(anchorId);
    SEL_ORC=buildExpandedOrcSpreadFromFree(SEL_ORC[0]);
    showToast('今のカードを軸に、追加カードを展開しました');
    renderClarifyScreen();
    showScreen('s-clarify',85);
    return;
  }
  showScreen('s-len',40);
  startLenShuffle();
}

function parseTaggedDossier(raw){
  const text=String(raw||'');
  const tags=['TITLE','SUBTITLE','HEADLINE','CORE','TIMING','ACTION7','ACTION30','WARNING','LUCK','KEYWORDS','CLOSING'];
  const data={};
  tags.forEach(tag=>{
    const re=new RegExp(`\\[\\[${tag}\\]\\]([\\s\\S]*?)\\[\\[\\/${tag}\\]\\]`);
    const match=text.match(re);
    data[tag]=match?match[1].trim():'';
  });
  return data;
}

function sectionLines(text){
  return String(text||'')
    .split('\n')
    .map(line=>line.replace(/^[\-\u2022・\d\.\)\s]+/,'').trim())
    .filter(Boolean);
}

function buildFallbackDossier(){
  const input=getCurrentInputSnapshot();
  const focus=analyzeConsultationFocus(input.cat,input.theme);
  const action7=buildThemeSpecificActionPlan(focus);
  const action30=buildThirtyDayActionPlan(focus);
  const headline=getSectionBody(LAST_OUTPUTS.integration,0)||`${focus.shortLabel}を一度に決め切るより、判断の軸を先に整えるほうが前に進みやすい時期です。`;
  const core=getSectionBody(LAST_OUTPUTS.len,0)||getSectionBody(LAST_OUTPUTS.foundationDeep,0)||getSectionBody(LAST_OUTPUTS.orc,0)||'いまは感情の強さより、何が判断を止めているのかを整理することが先です。';
  const timing=getSectionBody(LAST_OUTPUTS.integration,1)||getSectionBody(LAST_OUTPUTS.orc,2)||'大きな結論は急がず、今週の確認で見えてくる変化を判断材料にしてください。';
  return{
    TITLE:focus.dossierTitle,
    SUBTITLE:`${input.fullname||'あなた'}さんが迷ったときに、カード鑑定と診断をまとめて読み返すための鑑定書`,
    HEADLINE:headline,
    CORE:core,
    TIMING:timing,
    ACTION7:action7.join('\n'),
    ACTION30:action30.join('\n'),
    WARNING:buildDossierWarnings(focus).join('\n'),
    LUCK:buildDossierLuck(focus).join('\n'),
    KEYWORDS:buildDossierKeywords(focus),
    CLOSING:`${input.fullname||'あなた'}さんに必要なのは、完璧な正解を探すことではなく、納得できる判断軸を先に持つことです。焦って白黒をつけるより、今週の確認を積み重ねたほうが答えははっきりします。`,
  };
}

const LEN_POSITION_LABELS=[
  '背景×顕在',
  '現状×顕在',
  '未来×顕在',
  '背景×現実',
  '現状の核心',
  '未来×現実',
  '背景×潜在',
  '現状×潜在',
  '未来×潜在'
];

const ORC_POSITION_LABELS=['左（背景）','中（現状）','右（未来）'];

const LEN_ROW_GUIDES=[
  {
    title:'上段（顕在意識）',
    meaning:'本人がすでに気づいていること、表に出ている認識',
    indexes:[0,1,2],
  },
  {
    title:'中段（現実）',
    meaning:'今まさに起きていること、現実面で動いている条件',
    indexes:[3,4,5],
  },
  {
    title:'下段（潜在意識）',
    meaning:'まだ言語化しきれていない本音や深層反応',
    indexes:[6,7,8],
  },
];

const LEN_COLUMN_GUIDES=[
  {
    title:'左列（背景）',
    meaning:'ここに至るまでの背景・原因・過去からの流れ',
    indexes:[0,3,6],
  },
  {
    title:'中列（現状）',
    meaning:'いまの現在地と核心、いま意識化すべきこと',
    indexes:[1,4,7],
  },
  {
    title:'右列（未来）',
    meaning:'今のまま進んだ場合の近い未来と変化の方向',
    indexes:[2,5,8],
  },
];

const LEN_DIAGONAL_GUIDES=[
  {
    title:'対角線（左上→中央→右下）',
    meaning:'表に出ている認識から核心を通って、未来の深層へどうつながるか',
    indexes:[0,4,8],
  },
  {
    title:'対角線（右上→中央→左下）',
    meaning:'未来への見立てと核心、背景にある深層反応の交差',
    indexes:[2,4,6],
  },
];

const LEN_ADJACENT_PAIR_GUIDES_9=[
  {title:'上段左→中',indexes:[0,1]},
  {title:'上段中→右',indexes:[1,2]},
  {title:'中段左→中心',indexes:[3,4]},
  {title:'中心→中段右',indexes:[4,5]},
  {title:'下段左→中',indexes:[6,7]},
  {title:'下段中→右',indexes:[7,8]},
  {title:'左上→左中',indexes:[0,3]},
  {title:'左中→左下',indexes:[3,6]},
  {title:'上中→中心',indexes:[1,4]},
  {title:'中心→下中',indexes:[4,7]},
  {title:'右上→右中',indexes:[2,5]},
  {title:'右中→右下',indexes:[5,8]},
];

const LEN_ADJACENT_PAIR_GUIDES_3=[
  {title:'背景→現状の核心',indexes:[0,1]},
  {title:'現状の核心→次の流れ',indexes:[1,2]},
];

const LEN_MIRROR_PAIR_GUIDES=[
  {title:'左上↔右下',indexes:[0,8]},
  {title:'上中↔下中',indexes:[1,7]},
  {title:'右上↔左下',indexes:[2,6]},
  {title:'左中↔右中',indexes:[3,5]},
];

const LEN_KNIGHT_OFFSETS=[
  [-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1],
];

function splitLenKeywordHead(text=''){
  return String(text||'')
    .split(/[,\u3001，]/)
    .map(v=>v.trim())
    .filter(Boolean)[0]||String(text||'').trim();
}

function getLenAdjacentPairIndexes(total=SEL_LEN.length){
  if(total===9) return LEN_ADJACENT_PAIR_GUIDES_9.map(item=>item.indexes);
  if(total===FREE_LEN_COUNT) return LEN_ADJACENT_PAIR_GUIDES_3.map(item=>item.indexes);
  return [];
}

function getLenGridCoord(index){
  return{
    row:Math.floor(index/3),
    col:index%3,
  };
}

function getLenGridIndex(row,col){
  if(row<0||row>2||col<0||col>2) return -1;
  return row*3+col;
}

function getLenKnightIndexes(index,total=SEL_LEN.length){
  if(total!==9) return [];
  const {row,col}=getLenGridCoord(index);
  return LEN_KNIGHT_OFFSETS
    .map(([dr,dc])=>getLenGridIndex(row+dr,col+dc))
    .filter(idx=>idx>=0);
}

function hasLenAdjacentCardPair(idA,idB,total=SEL_LEN.length){
  if(!idA||!idB) return false;
  const pairKey=[idA,idB].sort((a,b)=>a-b).join('-');
  return getLenAdjacentPairIndexes(total).some(([left,right])=>{
    const ids=[SEL_LEN[left],SEL_LEN[right]].sort((a,b)=>a-b).join('-');
    return ids===pairKey;
  });
}

function getLenPairSpecialRule(idA,idB){
  const key=[idA,idB].sort((a,b)=>a-b).join('-');
  if(key==='7-23'||key==='14-23'){
    return '捕食者ルール。ネズミの消耗や損失を、蛇/キツネが逆手に取る流れとして補正する。';
  }
  return '';
}

function getLenCategoryKey(cat='総合'){
  return cat==='恋愛'?'love':cat==='仕事'||cat==='金運'?'work':'rel';
}

function getLenSpreadLabels(){
  if(SEL_LEN.length===9) return LEN_POSITION_LABELS;
  if(SEL_LEN.length===FREE_LEN_COUNT) return LEN_FREE_POSITION_LABELS;
  return ['引いたカード'];
}

function getOrcSpreadLabels(){
  return SEL_ORC.length===3?ORC_POSITION_LABELS:['引いたカード'];
}

function getLenSpreadLabel(index,total=SEL_LEN.length){
  if(total===9) return LEN_POSITION_LABELS[index]||`${index+1}枚目`;
  if(total===FREE_LEN_COUNT) return LEN_FREE_POSITION_LABELS[index]||`${index+1}枚目`;
  if(total===1) return '引いたカード';
  return `${index+1}枚目`;
}

function getOrcSpreadLabel(index,total=SEL_ORC.length){
  if(total===3) return ORC_POSITION_LABELS[index]||`${index+1}枚目`;
  return '引いたカード';
}

function buildLenSpreadPromptContext(cat='総合'){
  const catKey=getLenCategoryKey(cat);
  const cards=SEL_LEN.map((id,index)=>{
    const data=LENORMAND[id]||{};
    const label=getLenSpreadLabel(index,SEL_LEN.length);
    const themeText=data[catKey]||data.love||data.rel||'';
    const moneyText=cat==='金運'?(data.work||data.kw||''):'';
    return{
      id,
      index,
      data,
      name:data.name||'',
      label,
      themeText,
      detail:[
        `${label}：No.${id}「${data.name||''}」`,
        `  キーワード：${data.kw||''}`,
        `  ポジティブ：${data.pos||''}`,
        `  ネガティブ：${data.neg||''}`,
        `  ${cat}面：${themeText}`,
        moneyText?`  金運・お金面：${moneyText}`:'',
        data.special?`  【特殊ルール】${data.special}`:'',
      ].filter(Boolean).join('\n'),
    };
  });
  const describeCard=card=>`${card.label} No.${card.id}「${card.name}」`;
  const describeGroup=group=>`- ${group.title}｜${group.meaning}\n  ${group.indexes.map(index=>describeCard(cards[index])).join(' / ')}`;
  const describePair=(pairGuide)=>{
    const [leftIndex,rightIndex]=pairGuide.indexes;
    const left=cards[leftIndex];
    const right=cards[rightIndex];
    if(!left||!right) return '';
    const leftHead=splitLenKeywordHead(left.data.kw||left.themeText||left.name);
    const rightHead=splitLenKeywordHead(right.data.kw||right.themeText||right.name);
    const special=getLenPairSpecialRule(left.id,right.id);
    return `- ${pairGuide.title}｜${describeCard(left)} + ${describeCard(right)}｜前を主役、後を修飾として読む｜${leftHead}を${rightHead}が色づける${special?`｜${special}`:''}`;
  };
  const describeChain=(title,indexes,meaning='')=>{
    const chain=indexes.map(index=>cards[index]).filter(Boolean);
    if(chain.length!==indexes.length) return '';
    return `- ${title}${meaning?`｜${meaning}`:''}\n  ${chain.map(card=>describeCard(card)).join(' → ')}`;
  };
  const pairGuides=cards.length===9?LEN_ADJACENT_PAIR_GUIDES_9:(cards.length===FREE_LEN_COUNT?LEN_ADJACENT_PAIR_GUIDES_3:[]);
  const pairDetails=pairGuides.map(describePair).filter(Boolean).join('\n');
  const chainDetails=[
    ...(cards.length===9?LEN_ROW_GUIDES.map(group=>describeChain(`${group.title}の3連鎖`,group.indexes,group.meaning)):[]),
    ...(cards.length===9?LEN_COLUMN_GUIDES.map(group=>describeChain(`${group.title}の3連鎖`,group.indexes,group.meaning)):[]),
    ...(cards.length===9?LEN_DIAGONAL_GUIDES.map(group=>describeChain(`${group.title}の3連鎖`,group.indexes,group.meaning)):[]),
    ...(cards.length===FREE_LEN_COUNT?[describeChain('3枚の一直線', [0,1,2], '背景→核心→次の流れを一文として読む')]:[]),
  ].filter(Boolean).join('\n');
  const crossDetails=cards.length===9
    ?`- 中心十字｜${[1,3,4,5,7].map(index=>describeCard(cards[index])).join(' / ')}\n  ⑤を中心に、②④⑥⑧を最も直接影響するカードとして扱う`
    :'';
  const cornerDetails=cards.length===9
    ?`- 角の枠｜${[0,2,6,8].map(index=>describeCard(cards[index])).join(' / ')}\n  外側の条件、場の空気、避けにくい境界として読む`
    :'';
  const mirrorPairDetails=cards.length===9
    ?LEN_MIRROR_PAIR_GUIDES.map(group=>{
      const [left,right]=group.indexes.map(index=>cards[index]);
      if(!left||!right) return '';
      return `- ${group.title}｜${describeCard(left)} ↔ ${describeCard(right)}｜表と裏、現在と深層の照応を見る`;
    }).filter(Boolean).join('\n')
    :'';
  const distanceDetails=cards.length===9
    ?`- 近距離｜${[1,3,5,7].map(index=>describeCard(cards[index])).join(' / ')}｜⑤に直結する直接影響\n- 遠距離｜${[0,2,6,8].map(index=>describeCard(cards[index])).join(' / ')}｜背景条件・外枠・遅れて効く要因`
    :'';
  const themeKeyMap={恋愛:24,結婚:25,仕事:35,金運:34,健康:5,転職:17,秘密:26,問題解決:33,人間関係:20};
  const themeKeyId=themeKeyMap[cat]||(cat==='仕事'?35:cat==='金運'?34:null);
  const themeKeyIndex=themeKeyId?cards.findIndex(card=>card.id===themeKeyId):-1;
  const topicFocusDetails=(cards.length===9&&themeKeyIndex>=0)
    ?(()=>{
      const {row,col}=getLenGridCoord(themeKeyIndex);
      const neighborIndexes=[
        getLenGridIndex(row-1,col),getLenGridIndex(row,col-1),getLenGridIndex(row,col+1),getLenGridIndex(row+1,col)
      ].filter(index=>index>=0&&index!==themeKeyIndex);
      const focusCard=cards[themeKeyIndex];
      const neighbors=neighborIndexes.map(index=>cards[index]).filter(Boolean);
      if(!focusCard||!neighbors.length) return '';
      return `- テーマカード周辺読み｜${describeCard(focusCard)} が出ているため、このカードを小さな中心として ${neighbors.map(describeCard).join(' / ')} も局所文脈として重ねる`;
    })()
    :'';
  const knightFocusIndexes=(cards.length===9
    ?Array.from(new Set([
      themeKeyIndex,
      ...cards.map((card,index)=>[6,7,14,21,22,23,25,26,33].includes(card.id)?index:null).filter(index=>index!==null),
    ])).filter(index=>index>=0)
    :[]);
  const knightDetails=cards.length===9
    ?knightFocusIndexes.map(index=>{
      const card=cards[index];
      const targets=getLenKnightIndexes(index,cards.length).map(targetIndex=>cards[targetIndex]).filter(Boolean);
      if(!card||!targets.length) return '';
      return `- ナイト読み｜${describeCard(card)} から飛ぶ先：${targets.map(describeCard).join(' / ')}`;
    }).filter(Boolean).slice(0,4).join('\n')
    :'';
  return{
    catKey,
    cards,
    cardDetails:cards.map(card=>card.detail).join('\n'),
    rowDetails:cards.length===9?LEN_ROW_GUIDES.map(describeGroup).join('\n'):'',
    columnDetails:cards.length===9?LEN_COLUMN_GUIDES.map(describeGroup).join('\n'):'',
    diagonalDetails:cards.length===9?LEN_DIAGONAL_GUIDES.map(describeGroup).join('\n'):'',
    pairDetails,
    chainDetails,
    crossDetails,
    cornerDetails,
    mirrorPairDetails,
    distanceDetails,
    knightDetails,
    topicFocusDetails,
  };
}

function renderDossierProofRow(cards,type,title){
  if(!cards.length) return '';
  return`
    <div class="dossier-proof-section">
      <div class="dossier-proof-section-title">${escapeHtml(title)}</div>
      <div class="dossier-proof-grid">
        ${cards.map(card=>`
          <div class="dossier-mini-card">
            <div class="dossier-mini-thumb">
              <img src="${escapeHtml(card.img)}" alt="${escapeHtml(card.name)}">
            </div>
            <div class="dossier-mini-label">${escapeHtml(card.label)}</div>
            <div class="dossier-mini-name">No.${escapeHtml(card.id)} ${escapeHtml(card.name)}</div>
          </div>
        `).join('')}
      </div>
    </div>`;
}

function buildDossierProof(){
  const input=getCurrentInputSnapshot();
  const basisTags=[];
  if(input.cat) basisTags.push(`相談テーマ ${input.cat}`);
  if(input.theme) basisTags.push('本人の悩みを直接反映');
  if(MEIMEI) basisTags.push('生まれの傾向');
  if(NAMEJUDGE) basisTags.push('名前から伝わる印象');
  if(REACTION_PROFILE?.label) basisTags.push('魂の本質診断の傾向');
  if(hasClarifyAnswers()) basisTags.push('追加ヒアリング');

  return`
    <div class="dossier-proof">
      <div class="dossier-proof-head">
        <div>
          <div class="dossier-proof-eyebrow">見た観点</div>
          <div class="dossier-proof-title">今回の鑑定で見た観点</div>
        </div>
        <div class="dossier-proof-copy">${escapeHtml(input.fullname||'あなた')}さんの相談内容、生まれや名前から伝わる傾向、魂の本質診断の傾向を重ね、判断材料として読み返しやすい形へ再編集した鑑定書です。</div>
      </div>
      <div class="dossier-proof-meta">
        ${basisTags.filter(Boolean).map(tag=>`<div class="dossier-proof-pill">${escapeHtml(tag)}</div>`).join('')}
      </div>
    </div>`;
}

function getDossierDiagnosticSections(){
  const namePlain=buildNamePlainInsight(NAMEJUDGE);
  const birthPlain=buildBirthPlainInsight(MEIMEI);
  const lifeText=buildLifePatternPlainText();
  const reaction=REACTION_PROFILE;
  return[
    {
      eyebrow:'診断',
      title:'名前から見える傾向',
      body:namePlain
        ?[namePlain.overview,namePlain.timing,namePlain.advice].filter(Boolean).join('\n\n')
        :'名前が未入力のため、この部分は今回は省略しています。'
    },
    {
      eyebrow:'診断',
      title:'生まれから見える傾向',
      body:[
        birthPlain?[birthPlain.overview,birthPlain.timing,birthPlain.advice].filter(Boolean).join('\n\n'):'生まれの情報が不足しているため、この部分は今回は簡易表示です。',
        lifeText&&!/使っていません/.test(lifeText)?`誕生日から見える行動のくせ：${lifeText}`:''
      ].filter(Boolean).join('\n\n')
    },
    {
      eyebrow:'診断',
      title:'魂の本質診断から見える傾向',
      body:reaction
        ?[
          reaction.summary,
          `反応が出やすい場面：${reaction.stress}`,
          `力が出やすい動き：${reaction.power}`,
          reaction.handling,
        ].filter(Boolean).join('\n\n')
        :'魂の本質診断がまだ未入力のため、この部分は簡易表示です。'
    }
  ];
}

function getDossierIncludedSections(){
  return[
    ...getDossierDiagnosticSections(),
    {
      eyebrow:'カード鑑定',
      title:'ルノルマンカード鑑定',
      body:LAST_OUTPUTS.len||'ルノルマンカード鑑定はまだ生成されていません。'
    },
    {
      eyebrow:'カード鑑定',
      title:'オラクルカード鑑定',
      body:LAST_OUTPUTS.orc||'オラクルカード鑑定はまだ生成されていません。'
    },
    {
      eyebrow:'最終結論',
      title:'カード占いの最終結論',
      body:LAST_OUTPUTS.integration||'最終結論はまだ生成されていません。'
    }
  ].filter(section=>String(section.body||'').trim());
}

function renderDossierRichBodyHTML(text=''){
  const sections=splitSections(text);
  if(!sections.length) return renderStructuredBlocksHTML(text);
  return sections.map(section=>{
    const parsed=parseStructuredSection(section);
    return`
      <div class="dossier-subsection">
        <div class="dossier-subsection-title">${escapeHtml(parsed.title||'内容')}</div>
        ${renderStructuredBlocksHTML(parsed.body||'')}
      </div>`;
  }).join('');
}

function renderDossierIncludedSections(){
  const sections=getDossierIncludedSections();
  if(!sections.length) return '';
  return`
    <div class="dossier-proof">
      <div class="dossier-proof-head">
        <div>
          <div class="dossier-proof-eyebrow">保存内容</div>
          <div class="dossier-proof-title">この鑑定書に入る内容</div>
        </div>
        <div class="dossier-proof-copy">カード占いの結果だけでなく、名前・生まれ・魂の本質診断から見えた傾向まで含めて、1回分の鑑定をまとめて保存できる形にしています。</div>
      </div>
    </div>
    <div class="dossier-grid">
      ${sections.map(section=>`
        <div class="dossier-card wide">
          <div class="dossier-card-eyebrow">${escapeHtml(section.eyebrow||'内容')}</div>
          <div class="dossier-card-title">${escapeHtml(section.title||'鑑定内容')}</div>
          <div class="dossier-card-body rich">${renderDossierRichBodyHTML(section.body||'')}</div>
        </div>
      `).join('')}
    </div>`;
}

function buildDossierPlainText(data){
  const safeData={...buildFallbackDossier(),...(data||{})};
  const blocks=[
    safeData.TITLE||'鑑定書',
    safeData.SUBTITLE||'',
    `■ 最初に結論\n${safeData.HEADLINE||''}`,
    `■ いま起きていること\n${safeData.CORE||''}`,
    `■ 判断の分かれ目\n${safeData.TIMING||''}`,
    `■ やらないほうがいいこと\n${sectionLines(safeData.WARNING).join('\n')}`,
    `■ 7日以内にやること\n${sectionLines(safeData.ACTION7).map((item,index)=>`${index+1}. ${item}`).join('\n')}`,
    `■ 30日で整えること\n${sectionLines(safeData.ACTION30).map((item,index)=>`${index+1}. ${item}`).join('\n')}`,
    `■ 進みやすくなるサイン\n${sectionLines(safeData.LUCK).join('\n')}`,
    `■ 判断の軸\n${sectionLines(safeData.KEYWORDS).join('\n')||String(safeData.KEYWORDS||'').split('/').map(item=>item.trim()).filter(Boolean).join('\n')}`,
    `■ 読み返すときの言葉\n${safeData.CLOSING||''}`,
    ...getDossierIncludedSections().map(section=>`■ ${section.title}\n${section.body}`)
  ];
  return blocks.map(block=>String(block||'').trim()).filter(Boolean).join('\n\n');
}

function renderDossierCards(data){
  const keywords=sectionLines(data.KEYWORDS||'').join('\n')||data.KEYWORDS||'';
  const keywordItems=keywords.split(/[\/\n]/).map(v=>v.trim()).filter(Boolean).slice(0,6);
  return`
    <div class="dossier-hero">
      <div class="dossier-hero-title">最初に結論</div>
      <div class="dossier-hero-body">${escapeHtml(data.HEADLINE||'')}</div>
    </div>
    <div class="dossier-grid">
      <div class="dossier-card wide">
        <div class="dossier-card-eyebrow">整理</div>
        <div class="dossier-card-title">いま起きていること</div>
        <div class="dossier-card-body">${escapeHtml(data.CORE||'')}</div>
      </div>
      <div class="dossier-card">
        <div class="dossier-card-eyebrow">分岐点</div>
        <div class="dossier-card-title">判断の分かれ目</div>
        <div class="dossier-card-body">${escapeHtml(data.TIMING||'')}</div>
      </div>
      <div class="dossier-card">
        <div class="dossier-card-eyebrow">注意</div>
        <div class="dossier-card-title">やらないほうがいいこと</div>
        <div class="dossier-list">${sectionLines(data.WARNING).map(item=>`<div class="dossier-list-item">${escapeHtml(item)}</div>`).join('')}</div>
      </div>
      <div class="dossier-card">
        <div class="dossier-card-eyebrow">7日</div>
        <div class="dossier-card-title">7日以内にやること</div>
        <div class="dossier-list">${sectionLines(data.ACTION7).map(item=>`<div class="dossier-list-item">${escapeHtml(item)}</div>`).join('')}</div>
      </div>
      <div class="dossier-card">
        <div class="dossier-card-eyebrow">30日</div>
        <div class="dossier-card-title">30日で整えること</div>
        <div class="dossier-list">${sectionLines(data.ACTION30).map(item=>`<div class="dossier-list-item">${escapeHtml(item)}</div>`).join('')}</div>
      </div>
      <div class="dossier-card">
        <div class="dossier-card-eyebrow">変化</div>
        <div class="dossier-card-title">進みやすくなるサイン</div>
        <div class="dossier-list">${sectionLines(data.LUCK).map(item=>`<div class="dossier-list-item">${escapeHtml(item)}</div>`).join('')}</div>
      </div>
      <div class="dossier-card">
        <div class="dossier-card-eyebrow">軸</div>
        <div class="dossier-card-title">判断の軸</div>
        <div class="dossier-chip-row">${keywordItems.map(item=>`<div class="dossier-chip">${escapeHtml(item)}</div>`).join('')}</div>
      </div>
      <div class="dossier-card wide">
        <div class="dossier-card-eyebrow">最後に</div>
        <div class="dossier-card-title">読み返すときの言葉</div>
        <div class="dossier-card-body">${escapeHtml(data.CLOSING||'')}</div>
      </div>
    </div>
    ${renderDossierIncludedSections()}`;
}

function renderPremiumDossier(loading=false){
  const section=document.getElementById('rs-dossier');
  const titleEl=document.getElementById('dossier-title');
  const subtitleEl=document.getElementById('dossier-subtitle');
  const loadingEl=document.getElementById('dossier-loading');
  const proofEl=document.getElementById('dossier-proof');
  const renderedEl=document.getElementById('dossier-rendered');
  const printBtn=document.getElementById('dossier-print-btn');
  const copyBtn=document.getElementById('dossier-copy-btn');
  if(!section||!titleEl||!subtitleEl||!loadingEl||!proofEl||!renderedEl||!printBtn||!copyBtn) return;

  const shouldPrepare=PLAN==='paid'||!!LAST_OUTPUTS.dossier;
  section.style.display='none';
  if(!shouldPrepare) return;

  if(loading){
    titleEl.textContent='鑑定書を整えています';
    subtitleEl.textContent='カード鑑定と診断をまとめて、PDFやコピーで残しやすい形へ整えています。';
    loadingEl.style.display='block';
    proofEl.style.display='none';
    renderedEl.style.display='none';
    printBtn.style.display='none';
    copyBtn.style.display='none';
    return;
  }

  const parsed=LAST_OUTPUTS.dossier?parseTaggedDossier(LAST_OUTPUTS.dossier):buildFallbackDossier();
  const safeData={...buildFallbackDossier(),...parsed};
  titleEl.textContent=safeData.TITLE||'鑑定書';
  subtitleEl.textContent=safeData.SUBTITLE||'今回のカード鑑定と診断を、まとめてPDFやコピーで残しやすい形へ整えました。';
  loadingEl.style.display='none';
  proofEl.style.display='block';
  proofEl.innerHTML=buildDossierProof();
  renderedEl.style.display='block';
  renderedEl.innerHTML=renderDossierCards(safeData);
  printBtn.style.display='inline-flex';
  copyBtn.style.display='inline-flex';
}

async function ensureDossierReady(){
  if(LAST_OUTPUTS.dossier) return true;
  if(DOSSIER_LOADING) return false;
  DOSSIER_LOADING=true;
  renderPremiumDossier(true);
  showToast('鑑定書を整えています');
  try{
    await runPremiumDossier();
    persistCurrentReading();
    renderPremiumDossier(false);
    return !!(LAST_OUTPUTS.dossier||LAST_OUTPUTS.integration||LAST_OUTPUTS.len||LAST_OUTPUTS.orc);
  }catch(_error){
    renderPremiumDossier(false);
    return !!(LAST_OUTPUTS.integration||LAST_OUTPUTS.len||LAST_OUTPUTS.orc);
  }finally{
    DOSSIER_LOADING=false;
  }
}

async function copyDossier(){
  const ready=await ensureDossierReady();
  if(!ready){
    showToast('鑑定書の準備に失敗しました');
    return;
  }
  const parsed=LAST_OUTPUTS.dossier?parseTaggedDossier(LAST_OUTPUTS.dossier):buildFallbackDossier();
  const raw=buildDossierPlainText(parsed);
  if(!navigator.clipboard?.writeText){
    showToast('この環境ではコピー機能を使えません');
    return;
  }
  navigator.clipboard.writeText(raw.replace(/\[\[\/?[A-Z0-9_]+\]\]/g,'').trim())
    .then(()=>showToast('鑑定書の内容をコピーしました'))
    .catch(()=>showToast('コピーに失敗しました'));
}

async function printDossier(){
  const ready=await ensureDossierReady();
  if(!ready){
    showToast('鑑定書の準備に失敗しました');
    return;
  }
  const section=document.getElementById('rs-dossier');
  const prevDisplay=section?section.style.display:'';
  if(section) section.style.display='block';
  document.body.classList.add('print-dossier');
  window.print();
  setTimeout(()=>{
    document.body.classList.remove('print-dossier');
    if(section) section.style.display=prevDisplay||'none';
  },500);
}

// ══════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════
function showScreen(id,progress){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('progress').style.width=progress+'%';
  if(typeof window.scrollTo==='function') window.scrollTo(0,0);
}

async function startFlow(plan){
  if(plan==='paid'&&!(await ensurePaidAccess('start-paid'))) return;
  startFlowUnlocked(plan);
}

function startFlowUnlocked(plan){
  PLAN=plan;
  showScreen('s-input',20);
}

function backToInputFromFlow(){
  CLARIFY_ANSWERS={};
  CLARIFY_ACTIVE_QUESTIONS=[];
  showScreen('s-input',20);
}

function rerollLenReading(){
  SEL_LEN=[];
  SEL_ORC=[];
  orcSelCards=[];
  CLARIFY_ANSWERS={};
  CLARIFY_ACTIVE_QUESTIONS=[];
  showScreen('s-len',40);
  startLenShuffle();
}

function backToLenStep(){
  CLARIFY_ANSWERS={};
  CLARIFY_ACTIVE_QUESTIONS=[];
  showScreen('s-len',40);
  if(SEL_LEN.length) showLenCards();
  else startLenShuffle();
}

function rerollOrcReading(){
  SEL_ORC=[];
  orcSelCards=[];
  CLARIFY_ANSWERS={};
  CLARIFY_ACTIVE_QUESTIONS=[];
  showScreen('s-orc',60);
  startOrcShuffle();
}

function backToOrcStep(){
  CLARIFY_ANSWERS={};
  CLARIFY_ACTIVE_QUESTIONS=[];
  showScreen('s-orc',60);
  if(SEL_ORC.length) showOrcCards();
  else startOrcShuffle();
}

function setGender(g){
  GENDER=g;
  ['female','male','other'].forEach(x=>document.getElementById('gb-'+x).classList.toggle('sel',x===g));
}

let checkSave=false;
function toggleCheck(){
  checkSave=!checkSave;
  syncCheckSaveUI();
  try{localStorage.setItem(INPUT_SAVE_PREF_KEY,checkSave?'1':'0');}catch(e){}
}

function clearSavedInputData(){
  try{
    localStorage.removeItem(INPUT_STORAGE_KEY);
    localStorage.removeItem(INPUT_SAVE_PREF_KEY);
  }catch(e){}
  checkSave=false;
  syncCheckSaveUI();
  resetInputFields();
  showToast('保存した入力をこの端末から消しました');
}

async function clearReadingHistoryData(){
  try{localStorage.removeItem(HISTORY_STORAGE_KEY);}catch(e){}
  await clearReadingHistoryFromVault();
  renderHomeVault();
  showToast('この端末の鑑定履歴を消しました');
}

function goToLen(){
  beginReadingSession();
  const fullname=document.getElementById('f-fullname').value.trim()||'（名前未入力）';
  const year=parseInt(document.getElementById('f-year').value);
  const month=parseInt(document.getElementById('f-month').value);
  const day=getSelectedBirthDay();
  const hour=getSelectedBirthHour();
  const cat=document.getElementById('f-cat')?.value||'総合';
  const theme=document.getElementById('f-theme')?.value?.trim()||'';
  if(!hasBirthYearMonth(year,month)){
    showToast('生年と生月を確認してください');
    syncDayOptions(day);
    return;
  }

  MEIMEI=calcMeimei(year,month,day,hour);
  LP=hasFullBirthDate(year,month,day)?calcLp(year,month,day):null;
  NAMEJUDGE=calcNameJudge(fullname);

  if(checkSave){
    try{localStorage.setItem(INPUT_STORAGE_KEY,JSON.stringify({fullname,gender:GENDER,year,month,day,hour,cat,theme,reactionAnswers:getReactionAnswersSnapshot(),reactionProfile:REACTION_PROFILE}));}catch(e){}
  }

  showScreen('s-len',40);
  startLenShuffle();
}

function skipInput(){
  beginReadingSession();
  const sampleYear=1990;
  const sampleMonth=6;
  const sampleDay=15;
  const sampleHour=12;
  const fullnameEl=document.getElementById('f-fullname');
  const yearEl=document.getElementById('f-year');
  const monthEl=document.getElementById('f-month');
  const dayEl=document.getElementById('f-day');
  const hourEl=document.getElementById('f-hour');
  const catEl=document.getElementById('f-cat');
  const themeEl=document.getElementById('f-theme');
  if(fullnameEl) fullnameEl.value='サンプル';
  if(yearEl) yearEl.value=String(sampleYear);
  if(monthEl) monthEl.value=String(sampleMonth);
  syncDayOptions(sampleDay);
  if(dayEl) dayEl.value=String(sampleDay);
  if(hourEl) hourEl.value=String(sampleHour);
  if(catEl) catEl.value='総合';
  if(themeEl) themeEl.value='';
  MEIMEI=calcMeimei(sampleYear,sampleMonth,sampleDay,sampleHour);
  LP=calcLp(sampleYear,sampleMonth,sampleDay);
  NAMEJUDGE=null;
  applySampleReactionAnswers();
  showToast('サンプル生年月日でお試し鑑定を開始します');
  showScreen('s-len',40);
  startLenShuffle();
}

function gotoTop(){
  SEL_LEN=[];SEL_ORC=[];FIXED_GENDER_CARD=null;orcSelCards=[];CLARIFY_ANSWERS={};CLARIFY_ACTIVE_QUESTIONS=[];
  CURRENT_READING_ID='';
  CURRENT_READING_CREATED_AT='';
  resetLatestOutputs();
  showScreen('s-top',0);
  renderHomeVault();
}

function goToHistory(){
  gotoTop();
  setTimeout(()=>{
    const target=document.getElementById('recent-history-list')||document.getElementById('continue-reading-btn')||document.getElementById('recent-history-empty');
    if(target&&typeof target.scrollIntoView==='function'){
      target.scrollIntoView({behavior:'smooth',block:'center'});
    }
  },120);
}

// ══════════════════════════════════════════════════
// LENORMAND FLOW
// ══════════════════════════════════════════════════
function startLenShuffle(){
  lenShuffling=true;
  FIXED_GENDER_CARD=GENDER==='male'?28:(GENDER==='female'?29:null);
  const deck=document.getElementById('len-deck');
  deck.style.display='';
  deck.classList.add('shuffling');
  deck.querySelectorAll('.shuffle-card').forEach(c=>c.classList.add('shuffling'));
  lenInterval=setInterval(()=>{
    deck.querySelectorAll('.shuffle-card').forEach(c=>{
      c.style.transform=`rotate(${(Math.random()-0.5)*12}deg) translate(${(Math.random()-0.5)*20}px,${(Math.random()-0.5)*10}px)`;
    });
  },400);
  document.getElementById('len-stop-btn').style.display='block';
  document.getElementById('len-cards-full').classList.remove('on');
  document.getElementById('len-inst').textContent='止めた瞬間に、上から並びをそのまま引きます';
}

function stopLen(){
  clearInterval(lenInterval);
  lenShuffling=false;
  const deck=document.getElementById('len-deck');
  deck.querySelectorAll('.shuffle-card').forEach(c=>{c.style.transform='';c.classList.remove('shuffling');});
  deck.style.display='none';
  document.getElementById('len-stop-btn').style.display='none';
  document.getElementById('len-inst').textContent='止めた順のまま、いまの流れに合う並びを整えています…';

  // 性別カードを除いた35枚をシャッフルし、上から自動で引く
  const pool=shuffle(Object.keys(LENORMAND).map(Number).filter(n=>n!==FIXED_GENDER_CARD));
  SEL_LEN=(PLAN==='paid'||PLAN==='reader')?pool.slice(0,9):pool.slice(0,FREE_LEN_COUNT);
  showLenCards();
}

function showLenCards(){
  document.getElementById('len-deck').style.display='none';
  document.getElementById('len-inst').textContent='いま出たカード';
  const full=document.getElementById('len-cards-full');
  full.classList.add('on');

  const grid=document.getElementById('len-cards-grid');
  grid.innerHTML='';

  // 性別カード（事前配置）を最上部に表示
  if(FIXED_GENDER_CARD){
    const preWrap=document.createElement('div');
    preWrap.style.cssText='display:flex;flex-direction:column;align-items:center;margin-bottom:24px;';
    const preLbl=document.createElement('div');
    preLbl.style.cssText='font-size:10px;letter-spacing:.3em;color:rgba(201,149,42,.7);margin-bottom:10px;';
    preLbl.textContent=`あなたを表すカード（事前配置）— No.${FIXED_GENDER_CARD} ${LENORMAND[FIXED_GENDER_CARD].name}`;
    preWrap.appendChild(preLbl);
    preWrap.appendChild(makeResultCard(FIXED_GENDER_CARD,'len','clamp(90px,22vw,130px)','clamp(135px,33vw,195px)',0));
    grid.appendChild(preWrap);
  }

  if(SEL_LEN.length===9){
    // デッキ上から引いた9枚を3×3グリッドで表示（全画面）
    const drawNote=document.createElement('div');
    drawNote.style.cssText='font-family:"Shippori Mincho",serif;font-size:12px;color:rgba(201,149,42,.5);text-align:center;margin-bottom:10px;letter-spacing:.1em;';
    drawNote.textContent='デッキ上から引いた9枚';
    grid.appendChild(drawNote);

    const g=document.createElement('div');
    g.className='grid33';
    const posLabels=getLenSpreadLabels();
    SEL_LEN.forEach((id,i)=>{
      const cell=document.createElement('div');
      cell.className='grid33-cell';
      // 画面幅に合わせてカードサイズを計算（3列・gap考慮）
      const card=makeResultCard(id,'len','clamp(104px,31.5vw,200px)','clamp(156px,47.2vw,300px)',i*0.08);
      if(i===4){
        card.style.border='2px solid rgba(201,149,42,.7)';
        card.style.boxShadow='0 0 20px rgba(201,149,42,.35),0 8px 32px rgba(0,0,0,.6)';
      }
      cell.appendChild(card);
      const lbl=document.createElement('div');
      lbl.className='pos-lbl';
      lbl.textContent=posLabels[i];
      if(i===4) lbl.style.color='rgba(201,149,42,.8)';
      cell.appendChild(lbl);
      g.appendChild(cell);
    });
    grid.appendChild(g);
  }else if(SEL_LEN.length===FREE_LEN_COUNT){
    const drawNote=document.createElement('div');
    drawNote.style.cssText='font-family:"Shippori Mincho",serif;font-size:12px;color:rgba(201,149,42,.5);text-align:center;margin-bottom:10px;letter-spacing:.1em;';
    drawNote.textContent='背景・現状・次の流れを読む3枚';
    grid.appendChild(drawNote);

    const row=document.createElement('div');
    row.style.cssText='display:flex;justify-content:center;gap:12px;flex-wrap:wrap;width:100%;';
    SEL_LEN.forEach((id,i)=>{
      const cell=document.createElement('div');
      cell.className='grid33-cell';
      const card=makeResultCard(id,'len','clamp(112px,29vw,180px)','clamp(168px,43.5vw,270px)',i*0.08);
      if(i===1){
        card.style.border='2px solid rgba(201,149,42,.7)';
        card.style.boxShadow='0 0 18px rgba(201,149,42,.28),0 8px 28px rgba(0,0,0,.55)';
      }
      cell.appendChild(card);
      const lbl=document.createElement('div');
      lbl.className='pos-lbl';
      lbl.textContent=LEN_FREE_POSITION_LABELS[i];
      if(i===1) lbl.style.color='rgba(201,149,42,.82)';
      cell.appendChild(lbl);
      row.appendChild(cell);
    });
    grid.appendChild(row);
  }else{
    // 旧データ互換：1枚 大表示
    const wrap=document.createElement('div');
    wrap.className='card-single-wrap';
    const card=makeResultCard(SEL_LEN[0],'len','clamp(240px,78vw,380px)','clamp(360px,117vw,570px)',0);
    card.classList.add('card-glow');
    wrap.appendChild(card);
    grid.appendChild(wrap);
  }
}

// ══════════════════════════════════════════════════
// ORACLE FLOW
// ══════════════════════════════════════════════════
function goToOrc(){
  showScreen('s-orc',60);
  startOrcShuffle();
}

function startOrcShuffle(){
  orcShuffling=true;
  orcSelCards=[];
  const deck=document.getElementById('orc-deck');
  deck.style.display='';
  deck.querySelectorAll('.shuffle-card').forEach(c=>{c.style.display='flex';});
  orcInterval=setInterval(()=>{
    deck.querySelectorAll('.shuffle-card').forEach(c=>{
      c.style.transform=`rotate(${(Math.random()-0.5)*12}deg) translate(${(Math.random()-0.5)*20}px,${(Math.random()-0.5)*10}px)`;
    });
  },400);
  document.getElementById('orc-stop-btn').style.display='block';
  document.getElementById('orc-select-area').classList.remove('on');
  document.getElementById('orc-cards-full').classList.remove('on');
  document.getElementById('orc-inst').textContent='止めたあと、裏向きカードの中から直感で選びます';
}

function stopOrc(){
  clearInterval(orcInterval);
  orcShuffling=false;
  const deck=document.getElementById('orc-deck');
  deck.querySelectorAll('.shuffle-card').forEach(c=>{c.style.transform='';});
  deck.style.display='none';
  document.getElementById('orc-stop-btn').style.display='none';

  const count=(PLAN==='paid'||PLAN==='reader')?3:FREE_ORC_COUNT;
  orcSelCards=[];
  document.getElementById('orc-sel-max').textContent=count;
  document.getElementById('orc-sel-count').textContent=0;
  document.getElementById('orc-confirm-btn').style.display='none';
  document.getElementById('orc-inst').textContent=`止めたあとは、今の気持ちに近い裏向きカードを ${count} 枚選んでください。色や模様の違いで選んで大丈夫です。`;
  buildOrcCardGrid(count);
  document.getElementById('orc-select-area').classList.add('on');
}

function buildOrcCardGrid(count){
  const pool=shuffle(Array.from({length:33},(_,i)=>i+1));
  const grid=document.getElementById('orc-card-grid');
  grid.innerHTML='';
  const sigils=['✦','✧','✶','✷','✹','✺'];
  pool.forEach((id,index)=>{
    const el=document.createElement('div');
    el.className='sel-card orc-sel-card';
    el.style.setProperty('--card-hue',String((id*37+index*11)%360));
    el.innerHTML=`<span class="sel-card-mark">${sigils[id%sigils.length]}</span><span class="sel-card-index">${String(id).padStart(2,'0')}</span>`;
    el.dataset.id=id;
    el.onclick=()=>selectOrcCard(el,count);
    grid.appendChild(el);
  });
}

function selectOrcCard(el,count){
  const id=parseInt(el.dataset.id);
  if(el.classList.contains('chosen')){
    el.classList.remove('chosen');
    delete el.dataset.order;
    orcSelCards=orcSelCards.filter(x=>x!==id);
    let order=1;
    document.getElementById('orc-card-grid').querySelectorAll('.sel-card.chosen').forEach(c=>{c.dataset.order=order++;});
  }else{
    if(orcSelCards.length>=count) return;
    orcSelCards.push(id);
    el.classList.add('chosen');
    el.dataset.order=orcSelCards.length;
  }
  document.getElementById('orc-sel-count').textContent=orcSelCards.length;
  document.getElementById('orc-confirm-btn').style.display=orcSelCards.length===count?'block':'none';
}

function confirmOrcSelection(){
  SEL_ORC=[...orcSelCards];
  document.getElementById('orc-select-area').classList.remove('on');
  showOrcCards();
}

function showOrcCards(){
  document.getElementById('orc-deck').style.display='none';
  document.getElementById('orc-inst').textContent='いま出たカード';
  const full=document.getElementById('orc-cards-full');
  full.classList.add('on');
  const grid=document.getElementById('orc-cards-grid');
  grid.innerHTML='';
  const isSingle=SEL_ORC.length===1;
  if(isSingle){
    // 無料：1枚 大表示
    const wrap=document.createElement('div');
    wrap.className='card-single-wrap';
    const card=makeResultCard(SEL_ORC[0],'orc','clamp(240px,78vw,380px)','clamp(360px,117vw,570px)',0);
    card.classList.add('card-glow');
    wrap.appendChild(card);
    grid.appendChild(wrap);
  }else{
    // 有料：3枚 大表示
    SEL_ORC.forEach((id,i)=>{
      const card=makeResultCard(id,'orc','clamp(104px,31.5vw,200px)','clamp(156px,47.2vw,300px)',i*0.1);
      grid.appendChild(card);
    });
  }
}

// ══════════════════════════════════════════════════
// RESULT
// ══════════════════════════════════════════════════
function goToResult(){
  CLARIFY_ANSWERS={};
  CLARIFY_ACTIVE_QUESTIONS=[];
  // 無料・占い師モードは待ち時間を増やさず即結果へ
  if(PLAN==='reader'||PLAN==='free'){
    showScreen('s-result',90);
    renderResult();
    return;
  }
  // プレミアム鑑定のみ、読みの焦点を定める確認へ
  CLARIFY_ACTIVE_QUESTIONS=buildClarifyQuestions();
  if(!CLARIFY_ACTIVE_QUESTIONS.length){
    showScreen('s-result',90);
    renderResult();
    return;
  }
  renderClarifyScreen();
  showScreen('s-clarify',85);
}

// ──────────────────────────────────────────────────
// CLARIFY SCREEN
// ──────────────────────────────────────────────────
function renderClarifyScreen(){
  const container=document.getElementById('clarify-questions');
  const progressEl=document.getElementById('clarify-progress');
  container.innerHTML='';
  if(!CLARIFY_ACTIVE_QUESTIONS.length) CLARIFY_ACTIVE_QUESTIONS=buildClarifyQuestions();
  if(!CLARIFY_ACTIVE_QUESTIONS.length) return;
  if(progressEl) progressEl.textContent=`追加確認 ${CLARIFY_ACTIVE_QUESTIONS.length}問`;

  CLARIFY_ACTIVE_QUESTIONS.forEach((qDef,i)=>{
    const block=document.createElement('div');
    block.className='clarify-q';
    block.dataset.qid=qDef.id;
    const taId=`ct-${qDef.id}`;
    const tmplBtns=(qDef.templates||[]).map(t=>
      `<button class="tmpl-btn" data-target="${taId}" data-tmpl="${t.replace(/"/g,'&quot;')}" onclick="setTemplate(this)">${t}</button>`
    ).join('');
    block.innerHTML=`
      <div class="clarify-q-num">FOCUS ${String(i+1).padStart(2,'0')}</div>
      <div class="clarify-q-badge"><span>${escapeHtml(qDef.badge)}</span>${escapeHtml(qDef.anchor||'')}</div>
      <div class="clarify-q-text">${escapeHtml(qDef.q)}</div>
      ${qDef.hint?`<div class="clarify-q-hint">🔍 ${escapeHtml(qDef.hint)}</div>`:''}
      <div class="tmpl-answers">${tmplBtns}</div>
      <textarea class="clarify-textarea" id="${taId}" placeholder="選択肢を選ぶか、自由に書いてください。"></textarea>`;
    container.appendChild(block);
  });
}

function setTemplate(btn){
  const taId=btn.dataset.target;
  const text=btn.dataset.tmpl;
  const ta=document.getElementById(taId);
  if(ta) ta.value=text;
  btn.closest('.tmpl-answers').querySelectorAll('.tmpl-btn').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
}

function collectClarifyAnswers(){
  const answers={};
  document.querySelectorAll('.clarify-q').forEach(block=>{
    const qid=block.dataset.qid;
    const ta=block.querySelector('.clarify-textarea');
    if(!ta||!ta.value.trim()) return;
    const def=CLARIFY_ACTIVE_QUESTIONS.find(question=>question.id===qid);
    if(!def) return;
    answers[qid]={
      id:def.id,
      badge:def.badge,
      anchor:def.anchor||'',
      q:def.q,
      a:ta.value.trim(),
    };
  });
  return answers;
}

function submitClarify(){
  CLARIFY_ANSWERS=collectClarifyAnswers();
  CLARIFY_ACTIVE_QUESTIONS=[];
  showScreen('s-result',90);
  renderResult();
}

function skipClarify(){
  CLARIFY_ANSWERS={};
  CLARIFY_ACTIVE_QUESTIONS=[];
  showScreen('s-result',90);
  renderResult();
}

function getClarifyEntries(){
  const values=Object.values(CLARIFY_ANSWERS||{});
  if(!values.length) return[];
  const first=values[0];
  if(first&&Array.isArray(first.qs)){
    return values.flatMap((entry,entryIndex)=>
      (entry.qs||[]).map((qa,qaIndex)=>({
        id:`legacy-${entryIndex}-${qaIndex}`,
        badge:entry.card||'補足確認',
        anchor:'',
        q:qa.q||'',
        a:qa.a||'',
      }))
    ).filter(entry=>entry.a);
  }
  return values.map((entry,index)=>({
    id:entry.id||`clarify-${index}`,
    badge:entry.badge||'補足確認',
    anchor:entry.anchor||'',
    q:entry.q||'',
    a:entry.a||'',
  })).filter(entry=>entry.a);
}

function hasClarifyAnswers(){
  return getClarifyEntries().length>0;
}

function buildClarifyPromptText(mode='detail'){
  const entries=getClarifyEntries();
  if(!entries.length) return mode==='plain'?'なし':'';
  const summary=`【相談者の補足整理（心理的背景含む）】\n${entries.map(entry=>`- ${entry.badge}：${entry.a}`).join('\n')}`;
  if(mode==='detail'){
    const detail=entries.map(entry=>`▼${entry.badge}${entry.anchor?`｜${entry.anchor}`:''}\nQ：${entry.q}${entry.hint?`\n推定：${entry.hint}`:''}\nA：${entry.a}`).join('\n');
    return `\n${summary}\n【相談者の補足回答（推定背景と実回答）】\n${detail}\n\n※上記補足は、CBT・動機付け面接・解決志向療法の観点から設計した質問への回答です。相談者の内的矛盾・変化への準備性・理想の着地点が読み取れます。判断材料の精度向上に活用してください。`;
  }
  if(mode==='compact'){
    return `\n${summary}`;
  }
  if(mode==='inline'){
    return '\n【相談者補足回答】\n'+entries.map(entry=>`▼${entry.badge}${entry.anchor?`｜${entry.anchor}`:''}：${entry.a}`).join('\n');
  }
  return entries.map(entry=>`${entry.badge}${entry.anchor?`(${entry.anchor})`:''}: ${entry.a}`).join('\n');
}

function renderResult(){
  renderCards();
  if(PLAN==='reader'){
    const progressCard=document.getElementById('result-progress-card');
    if(progressCard) progressCard.style.display='none';
    // 占い師モード：テキスト非表示、カード参照表のみ
    ['rs-integration'].forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.style.display='none';
    });
    const basisEl=document.getElementById('rs-basis');
    if(basisEl) basisEl.style.display='none';
    document.getElementById('r-len-block').style.display='none';
    document.getElementById('r-orc-block').style.display='none';
    renderReaderRef();
    document.getElementById('progress').style.width='100%';
    // シェアボタンも表示
    setTimeout(()=>{
      const btn=document.getElementById('share-x-btn');
      if(btn) btn.style.display='inline-flex';
    },400);
    renderPremiumDossier(false);
    renderMemberFollowupSection();
    renderResultUpgradePanel();
  }else{
    // 通常モード：AI読み上げ
    const progressCard=document.getElementById('result-progress-card');
    if(progressCard) progressCard.style.display='block';
    ['rs-integration'].forEach(id=>{
      const el=document.getElementById(id);
      if(el) el.style.display='';
    });
    const basisEl=document.getElementById('rs-basis');
    if(basisEl) basisEl.style.display='';
    document.getElementById('r-len-block').style.display='';
    document.getElementById('r-orc-block').style.display='';
    renderMeimei();
    renderNameJudge();
    renderReactionProfile();
    renderPremiumDossier(PLAN==='paid');
    renderResultUpgradePanel();
    renderMemberFollowupSection();
    startResultGeneration();
  }
}

const LEN_CLARIFY_POS_LABELS=LEN_POSITION_LABELS;
const ORC_CLARIFY_POS_LABELS=ORC_POSITION_LABELS;
const CLARIFY_CARD_GROUPS={
  blocker:[6,7,8,10,11,14,17,18,21,23,36],
  ambiguity:[6,7,18,24,25,26,32],
  external:[15,16,20,24,25,26,27,28,29,34,35],
  people:[15,28,29,30],
};

function getLenClarifyPosLabel(index,total=SEL_LEN.length){
  return getLenSpreadLabel(index,total);
}

function getOrcClarifyPosLabel(index,total=SEL_ORC.length){
  return getOrcSpreadLabel(index,total);
}

function buildClarifyCardContext(){
  const input=getCurrentInputSnapshot();
  const len=SEL_LEN.map((id,index)=>({
    source:'len',
    id,
    index,
    name:LENORMAND[id]?.name||'',
    posLabel:getLenClarifyPosLabel(index,SEL_LEN.length),
  }));
  const orc=SEL_ORC.map((id,index)=>({
    source:'orc',
    id,
    index,
    name:ORACLE[id]?.name||'',
    posLabel:getOrcClarifyPosLabel(index,SEL_ORC.length),
  }));
  const findByIds=(cards,ids)=>cards.find(card=>ids.includes(card.id))||null;
  // カード分類
  const blockerIds=[6,7,8,10,11,14,17,18,21,23,36];
  const ambiguityIds=[6,7,18,24,25,26,32];
  const externalIds=[15,16,20,24,25,26,27,28,29,34,35];
  const peopleIds=[15,28,29,30];
  const positiveIds=[1,2,16,17,31,33]; // 好転サイン
  const warningIds=[6,8,10,11,14,19,21,23,30,36]; // 警戒カード
  const blockerCard=findByIds(len,blockerIds);
  const ambiguityCard=findByIds(len,ambiguityIds);
  const externalCard=findByIds(len,externalIds);
  const peopleCard=findByIds(len,peopleIds);
  const hasWarningCard=len.some(c=>warningIds.includes(c.id));
  const hasPositiveCard=len.some(c=>positiveIds.includes(c.id));
  return{
    input,
    category:input.cat||'総合',
    theme:(input.theme||'').trim(),
    themeShort:((input.theme||'').trim().length<18),
    len,
    orc,
    coreCard:len.find(card=>card.index===4)||len.find(card=>card.index===1)||len[0]||null,
    futureCard:len.find(card=>card.index===5)||len.find(card=>card.index===2)||len[len.length-1]||null,
    blockerCard,
    ambiguityCard,
    externalCard,
    peopleCard,
    hasWarningCard,
    hasPositiveCard,
    currentOrc:orc[1]||orc[0]||null,
    futureOrc:orc[2]||orc[orc.length-1]||null,
  };
}

function buildClarifyAnchor(card,prefix='参考カード'){
  if(!card) return '今回の相談全体';
  return `${prefix}：${card.posLabel} No.${card.id} ${card.name}`;
}

function makeClarifyQuestion(id,badge,anchor,q,hint,templates){
  return{id,badge,anchor,q,hint,templates};
}

// ─── Q1: 核心確認（CBT ＝ 状況の認知整理）────────────────────────────
// 「今、何をはっきりさせたいか」を明確にする
// → 認知行動療法の「問題の定義」ステップに相当
function buildCoreClarifyQuestion(ctx){
  const card=ctx.coreCard||ctx.currentOrc;
  const anchor=buildClarifyAnchor(card,'核心に近いカード');
  switch(ctx.category){
    case '恋愛':
      return makeClarifyQuestion(
        'core','核心確認',anchor,
        '今回の鑑定で、いちばん「はっきりさせたい」のはどれに近いですか？',
        'カードから見ると、「相手側に揺れがある」か「自分の気持ちがまだ固まっていない」かのどちらかに見えます。',
        ['相手の本音・気持ちを知りたい','この関係が続くか終わるか見たい','自分がどう動けばいいか知りたい','この人を好きでいていいか迷っている']
      );
    case '仕事':
      return makeClarifyQuestion(
        'core','核心確認',anchor,
        '今回の鑑定で、いちばん整理したいのはどれですか？',
        'カードから見ると、「環境側の問題」か「自分の判断がまだ定まらない」かのどちらかが核心に見えます。',
        ['今の職場を続けるか変えるか決めたい','人間関係のストレスを整理したい','評価・収入の見通しを知りたい','自分に合う仕事・働き方を見つけたい']
      );
    case '金運':
      return makeClarifyQuestion(
        'core','核心確認',anchor,
        '今回、いちばん知りたいのはどれですか？',
        'カードから見ると、「今の流れが好転するか」か「動きのタイミングを見極めたい」かのどちらかに近いと思われます。',
        ['収入・お金の流れが好転するか知りたい','出費や不安の原因を整理したい','今動くべきか待つべきか判断したい','将来の安定した形を知りたい']
      );
    case '人間関係':
      return makeClarifyQuestion(
        'core','核心確認',anchor,
        '今回の鑑定で、いちばん整理したいのはどれですか？',
        'カードから見ると、「相手への対処」か「自分の受け止め方を変える」かのどちらかが鍵に見えます。',
        ['相手の本音・行動の意図を知りたい','この関係をどう続けるか決めたい','自分が傷つかない距離感を知りたい','関係を修復すべきか手放すか判断したい']
      );
    default:
      return makeClarifyQuestion(
        'core','核心確認',anchor,
        '今回の鑑定で、いちばんはっきりさせたいのはどれに近いですか？',
        'カードから見ると、「状況の外側にある問題」か「自分の中にある迷い」かのどちらかに核心がありそうです。',
        ['今の状況の流れを整理したい','相手や環境の影響を読みたい','次に何をすべきか知りたい','自分の気持ちや判断を固めたい']
      );
  }
}

// ─── Q2: 感情 vs 認知のズレ（CBT の自動思考同定）────────────────────
// 「頭では分かっているのに動けない」という内的矛盾を特定する
function buildCognitiveMismatchQuestion(ctx){
  const card=ctx.blockerCard||ctx.ambiguityCard||ctx.currentOrc;
  const anchor=buildClarifyAnchor(card,'引っかかりに近いカード');
  switch(ctx.category){
    case '恋愛':
      return makeClarifyQuestion(
        'mismatch','頭と気持ちのズレ',anchor,
        '「頭では分かっているけど、気持ちがついていかない」と感じることはありますか？',
        'このカードの組み合わせから、「理性では答えが出ているが、感情がブレーキをかけている」状態に見えます。どれに近いか教えてください。',
        ['離れた方がいいと分かっているが踏み切れない','相手を信じたいのに疑いが消えない','もう終わりにしたいのに連絡を待ってしまう','自分の気持ちが何なのか、自分でも分からない']
      );
    case '仕事':
      return makeClarifyQuestion(
        'mismatch','頭と気持ちのズレ',anchor,
        '「頭では答えが出ているけど、動けない」と感じていますか？',
        'カードから見ると、「判断材料は揃っているのに一歩が踏み出せない」状態に見えます。どれに近いか教えてください。',
        ['転職・変化の必要性は感じているが動けない','今の職場を辞めたいが後悔が怖い','やりたいことは分かっているが現実的に無理だと感じる','誰かの期待や評価を気にしすぎて判断できない']
      );
    case '金運':
      return makeClarifyQuestion(
        'mismatch','頭と気持ちのズレ',anchor,
        'お金の問題で「分かっているのにできない」ことはありますか？',
        'カードから見ると、「行動の方向性は見えているが、不安が先に立って動けない」状態に見えます。',
        ['節約・見直しが必要だと分かっているが続かない','投資・動きを考えているが怖くて踏み出せない','収入を上げたいが具体的な方法が分からない','お金のことを考えると気持ちが重くなって避けてしまう']
      );
    default:
      return makeClarifyQuestion(
        'mismatch','頭と気持ちのズレ',anchor,
        '「頭では分かっているのに、なかなか動けない」と感じていることはありますか？',
        'カードから見ると、「情報や判断は揃っているが、感情的なブレーキがかかっている」ように見えます。',
        ['答えは分かっているが踏み切れない','変わりたいのに変われない自分がいる','周囲への影響が気になって動けない','どこから手をつけていいか分からない']
      );
  }
}

// ─── Q3: 変化への準備性（動機付け面接）─────────────────────────────
// 「今すぐ動きたいのか、もう少し様子を見たいのか」を把握する
// → 動機付け面接の「変化のステージ」に相当（前熟考→熟考→準備→行動）
function buildChangeReadinessQuestion(ctx){
  const card=ctx.futureCard||ctx.futureOrc;
  const anchor=buildClarifyAnchor(card,'今後の流れに近いカード');
  switch(ctx.category){
    case '恋愛':
      return makeClarifyQuestion(
        'readiness','動く準備の確認',anchor,
        'いま、この関係に対してどのくらい「動く気持ち」がありますか？',
        'カードの流れから見ると、「近いうちに何かが動く」タイミングに見えます。今のあなたの状態はどれに近いですか？',
        ['すぐにでも動きたい・連絡したい','もう少し様子を見てから動きたい','相手の出方を見て決めたい','まずは自分の気持ちを整理してから']
      );
    case '仕事':
      return makeClarifyQuestion(
        'readiness','動く準備の確認',anchor,
        '今の状況を変えることへの「準備度」はどのくらいですか？',
        'カードから見ると、変化の波が近づいているように見えます。今のあなたの状態はどれに近いですか？',
        ['今すぐ動ける・すでに動いている','3ヶ月以内には動きたい','半年〜1年かけて準備したい','まだ具体的に考えられない段階']
      );
    case '金運':
      return makeClarifyQuestion(
        'readiness','行動の準備確認',anchor,
        'お金の状況を変えることへの「準備度」はどのくらいですか？',
        'カードから見ると、変化できる時期が近づいているように見えます。',
        ['今すぐ具体的な行動を起こせる','少し準備が整ったら動ける','もう少し情報を集めてから','今はまだ動けない事情がある']
      );
    default:
      return makeClarifyQuestion(
        'readiness','行動の準備確認',anchor,
        '今のテーマについて「行動を起こす準備度」はどのくらいですか？',
        'カードの流れから見ると、動けるタイミングが近づいているように読めます。',
        ['今すぐ動きたい','近いうちに動けそう','もう少し様子を見たい','まだ整理が必要な段階']
      );
  }
}

// ─── Q4: 外部要因（自己効力感の棚卸し）────────────────────────────
// 「自分でコントロールできること」と「できないこと」を分ける
// → CBT の「コントロール可能性の認識」に相当
function buildLocusQuestion(ctx){
  const card=ctx.externalCard||ctx.peopleCard||ctx.futureCard;
  const anchor=buildClarifyAnchor(card,'影響力に近いカード');
  switch(ctx.category){
    case '恋愛':
    case '人間関係':
      return makeClarifyQuestion(
        'locus','影響の整理',anchor,
        'この問題で「自分でコントロールできること」と「相手や状況に任せるしかないこと」、どちらの比重が大きいですか？',
        'カードから見ると、「相手側の動き次第」の部分が多い状況に見えます。あなた自身のとらえ方に近いのはどれですか？',
        ['自分が変わればきっと相手も変わると思う','相手次第なのでこちらからはあまり動けない','自分にできることはやったので後は待つしかない','どちらが原因か、まだうまく整理できていない']
      );
    case '仕事':
      return makeClarifyQuestion(
        'locus','影響の整理',anchor,
        'この問題に「一番強く影響しているもの」はどれですか？',
        'カードから見ると、「職場や上司など外の要因」が大きく作用している状況に見えます。',
        ['上司・職場の方針や環境の問題が大きい','自分のスキル・経験がまだ足りない','タイミングや運が向いていない','自分の決断力・意志力が課題']
      );
    case '金運':
      return makeClarifyQuestion(
        'locus','影響の整理',anchor,
        'お金の問題で「自分が変えられること」と「外の事情」の比重はどちらが大きいですか？',
        'カードから見ると、「外の条件（仕事・市況など）」と「内の判断（使い方・動き方）」が両方絡んでいるように見えます。',
        ['外の事情（仕事・景気など）の影響が大きい','自分の行動や判断を変えれば改善できる','両方が絡み合っていて整理しにくい','特定の出来事や時期が起点になっている']
      );
    default:
      return makeClarifyQuestion(
        'locus','影響の整理',anchor,
        'この問題で一番強く影響しているのは「外の事情」と「自分の内側」、どちらですか？',
        'カードから見ると、外からの力と内側の反応が重なり合っている状況に見えます。',
        ['外の環境・他者の影響が大きい','自分の気持ちや判断の問題が大きい','両方が絡み合っている','何が原因か、まだはっきりしない']
      );
  }
}

// ─── Q5: 理想の着地点（解決空間の定義）─────────────────────────────
// 「どうなったら解決したと感じるか」を明確にする
// → 解決志向療法（SFT）の「奇跡の質問」に相当
function buildIdealOutcomeQuestion(ctx){
  const card=ctx.futureCard||ctx.futureOrc;
  const anchor=buildClarifyAnchor(card,'着地点に近いカード');
  switch(ctx.category){
    case '恋愛':
      return makeClarifyQuestion(
        'ideal','理想の着地点',anchor,
        '今回の鑑定を終えた後、どういう状態になれたら「読んでよかった」と感じますか？',
        'カードから見ると「関係の方向性」か「自分の気持ちの決め方」のどちらかが今の一番の課題に見えます。',
        ['相手との関係がどうなるか見えた','自分がどうすべきか決められた','今の気持ちをうまく整理できた','次の一歩を踏み出す勇気が持てた']
      );
    case '仕事':
      return makeClarifyQuestion(
        'ideal','理想の着地点',anchor,
        '今回の鑑定で、どんな「答え」が見えたら前に進みやすくなりますか？',
        'カードから見ると「決断の後押し」か「現実的な見通し」のどちらかが今最も必要に見えます。',
        ['続けるか変えるかの方向性が見えた','今の環境で生き残る立ち回りが分かった','転職・起業のタイミングが見えた','今日からできる具体的な行動が分かった']
      );
    case '金運':
      return makeClarifyQuestion(
        'ideal','理想の着地点',anchor,
        '今回の鑑定で、どんな「答え」が見えたら前に進みやすくなりますか？',
        'カードから見ると「流れの好転時期」か「今すぐ取れる行動」のどちらかが最優先に見えます。',
        ['お金の流れが好転するか・時期が分かった','今すぐ取れる行動が具体的に分かった','長期的な安定に向けた方向性が見えた','不安の原因がはっきり整理できた']
      );
    default:
      return makeClarifyQuestion(
        'ideal','理想の着地点',anchor,
        '今回の鑑定で、どんな「答え」が見えたら前に進みやすくなりますか？',
        'カードから見ると「状況の見通し」か「自分の行動の方向性」のどちらかが今の核心に見えます。',
        ['今の流れと今後の見通しが整理できた','次に何をすべきか具体的に分かった','相手や状況との向き合い方が見えた','自分の気持ちや価値観が整理できた']
      );
  }
}

// ─── 質問組み立てロジック（最大5問、最低3問）─────────────────────
function buildClarifyQuestions(){
  const ctx=buildClarifyCardContext();
  const cat=ctx.category;
  const hasStrongNeed=!!(ctx.themeShort||ctx.blockerCard||ctx.ambiguityCard||ctx.externalCard||ctx.peopleCard||ctx.hasWarningCard);
  // テーマが十分長く特に目立ったカードもない単純なケースでは省略
  if(!hasStrongNeed&&SEL_LEN.length<9) return [];

  const questions=[];

  // Q1: 核心確認（常に追加）
  questions.push(buildCoreClarifyQuestion(ctx));

  // Q2: 頭と気持ちのズレ（ブロッカーや曖昧カードがある場合、またはカテゴリに関係なく追加）
  questions.push(buildCognitiveMismatchQuestion(ctx));

  // Q3: 動く準備の確認（未来カードがある場合、またはテーマが明確な場合）
  if(ctx.futureCard||ctx.futureOrc||ctx.themeShort||SEL_LEN.length>=9){
    questions.push(buildChangeReadinessQuestion(ctx));
  }

  // Q4: 影響の整理（外部カードや人物カードがある場合、または恋愛・人間関係カテゴリ）
  if(ctx.externalCard||ctx.peopleCard||['恋愛','人間関係','仕事'].includes(cat)){
    questions.push(buildLocusQuestion(ctx));
  }

  // Q5: 理想の着地点（常に追加：解決志向でゴールを明確化）
  questions.push(buildIdealOutcomeQuestion(ctx));

  // 重複排除
  const seen=new Set();
  return questions.filter(question=>{
    if(!question||seen.has(question.id)) return false;
    seen.add(question.id);
    return true;
  }).slice(0,5);
}


function renderFortuneLayer(meimei){
  if(!meimei) return '';
  const branchDynamics=meimei.branchDynamics?.relations||[];
  const fortune=meimei.fortune;
  const dynamicHTML=branchDynamics.length?`
    <div class="fortune-shell">
      <div class="fortune-head">
        <div>
          <div class="fortune-eyebrow">NATAL DYNAMICS</div>
          <div class="fortune-headline">命式内の関係性</div>
        </div>
        <div class="fortune-meta">命式の中で、どの柱同士が結びやすいか・揺れやすいかを見ています。</div>
      </div>
      <div class="dynamic-list">
        ${branchDynamics.slice(0,4).map(item=>`
          <div class="dynamic-item">
            <div class="dynamic-label">${item.left} × ${item.right} / ${item.label}</div>
            <div class="dynamic-copy">${item.summary}</div>
          </div>`).join('')}
      </div>
    </div>`:'';
  if(!fortune) return dynamicHTML;
  const currentCycle=fortune.currentCycle||fortune.cycles?.[0]||null;
  const nextCycle=fortune.nextCycle||fortune.cycles?.[1]||null;
  const currentIndex=Math.max(0,(fortune.cycles||[]).findIndex(item=>item.isCurrent));
  const trackStart=Math.max(0,currentIndex>0?currentIndex-1:0);
  const trackItems=(fortune.cycles||[]).slice(trackStart,trackStart+4);
  const yearItems=(fortune.annual||[]).slice(0,6);
  const makePills=(item)=>[
    item?.tenGod?`十神 ${item.tenGod}`:'',
    item?.relationText?item.relationText:'',
  ].filter(Boolean).map(tag=>`<div class="fortune-pill">${tag}</div>`).join('');
  const fortuneHTML=`
    <div class="fortune-shell">
      <div class="fortune-head">
        <div>
          <div class="fortune-eyebrow">FORTUNE LAYER</div>
          <div class="fortune-headline">時期運の骨格</div>
        </div>
        <div class="fortune-meta">${fortune.directionLabel} / 起運 ${fortune.startText}<br>${fortune.directionNote}</div>
      </div>
      <div class="dm-note">${fortune.boundaryText}${currentCycle?`<br>いまは <strong>${currentCycle.pillar}</strong> の大運に入りやすく、${currentCycle.copy}`:''}</div>
      <div class="fortune-grid">
        ${currentCycle?`
          <div class="fortune-card current">
            <div class="fortune-kicker">CURRENT DAIUN</div>
            <div class="fortune-title">${currentCycle.ageLabel} / ${currentCycle.pillar}</div>
            <div class="fortune-copy">${currentCycle.copy}</div>
            <div class="fortune-pill-row">${makePills(currentCycle)}</div>
          </div>`:''}
        ${nextCycle?`
          <div class="fortune-card">
            <div class="fortune-kicker">NEXT DAIUN</div>
            <div class="fortune-title">${nextCycle.ageLabel} / ${nextCycle.pillar}</div>
            <div class="fortune-copy">${nextCycle.copy}</div>
            <div class="fortune-pill-row">${makePills(nextCycle)}</div>
          </div>`:''}
      </div>
      ${trackItems.length?`
        <div class="fortune-track">
          ${trackItems.map(item=>`
            <div class="fortune-track-item ${item.isCurrent?'current':''}">
              <div class="fortune-track-age">${item.ageLabel}</div>
              <div class="fortune-track-pillar">${item.pillar}</div>
              <div class="fortune-track-copy">${item.tenGod||'運勢'} / ${item.relationText||'大きな干渉は少なめ'}</div>
            </div>`).join('')}
        </div>`:''}
      ${yearItems.length?`
        <div class="fortune-year-grid">
          ${yearItems.map(item=>`
            <div class="fortune-year-item ${item.isCurrent?'current':''}">
              <div class="fortune-year-head">
                <div class="fortune-year-label">${item.year}年</div>
                <div class="fortune-year-pillar">${item.pillar}</div>
              </div>
              <div class="fortune-year-copy">${item.copy}</div>
              <div class="fortune-pill-row">${makePills(item)}</div>
            </div>`).join('')}
        </div>`:''}
    </div>`;
  return dynamicHTML+fortuneHTML;
}

function buildPlainInsightGrid(items=[]){
  const valid=(items||[]).filter(item=>item&&item.body);
  if(!valid.length) return '';
  return `
    <div class="insight-grid">
      ${valid.map(item=>`
        <div class="insight-card">
          ${item.kicker?`<div class="insight-kicker">${escapeHtml(item.kicker)}</div>`:''}
          <div class="insight-title">${escapeHtml(item.title||'ポイント')}</div>
          <div class="insight-copy">${escapeHtml(item.body)}</div>
        </div>`).join('')}
    </div>`;
}

function renderMeimei(){
  const wrap=document.getElementById('r-meimei-content');
  if(!wrap) return;
  if(!MEIMEI){
    wrap.innerHTML=`<div style="font-size:13px;color:var(--muted);font-family:'Shippori Mincho',serif;line-height:2;padding:16px 0">
      生まれの情報が足りないため、この部分はまだ見られません。<br>
      生年月を入れると、力の出し方や疲れやすい場面まで見やすくなります。
    </div>`;
    return;
  }
  const birthPlain=buildBirthPlainInsight(MEIMEI);
  const noteLines=[];
  if(MEIMEI.mode==='partial') noteLines.push('生まれた日の情報がないため、今回は大まかな傾向を中心に見ています。');
  if(MEIMEI.birthHour===null) noteLines.push('生まれた時間がわからないため、細かな出方には少し幅があります。');
  if(MEIMEI.useApproxSolarTerms) noteLines.push('一部はおおまかな時期として読んでいます。');
  const noteHTML=noteLines.length?`<div class="dm-note">${noteLines.join('<br>')}</div>`:'';
  const lpCard=LP?ORACLE[LP]:null;
  const cards=buildPlainInsightGrid([
    {kicker:'土台',title:'生まれから見える土台',body:birthPlain?.overview||'生まれから見える土台を読み取れませんでした。'},
    {kicker:'流れ',title:'今の流れ',body:birthPlain?.timing||'今の流れはまだ十分に読み取れていません。'},
    {kicker:'活かし方',title:'力が出やすい動き',body:birthPlain?.advice||'力が出やすい動きはまだ十分に読み取れていません。'},
    ...(lpCard?[{kicker:'くせ',title:'誕生日から見える動きのくせ',body:lpCard.msg||''}]:[])
  ]);

  wrap.innerHTML=noteHTML+cards;
}

function renderNameJudge(){
  const wrap=document.getElementById('r-namejudge-content');
  if(!NAMEJUDGE){
    wrap.innerHTML=`<div style="font-size:13px;color:var(--muted);font-family:'Shippori Mincho',serif;line-height:2;padding:16px 0">
      名前が入っていないため、この部分はまだ見られません。<br>
      名前を入れると、人にどう伝わりやすいかまで見やすくなります。
    </div>`;
    return;
  }
  const plain=buildNamePlainInsight(NAMEJUDGE);
  const nameHead=`
    <div style="font-family:'Shippori Mincho',serif;font-size:18px;letter-spacing:.25em;color:var(--gold-l);text-align:center;margin-bottom:20px">
      ${NAMEJUDGE.sei} <span style="font-size:12px;color:var(--muted);letter-spacing:.1em">✦</span> ${NAMEJUDGE.mei}
    </div>`;
  const metaNotes=[];
  if(NAMEJUDGE.approxChars.length) metaNotes.push('珍しい字は、近い数え方で見ています。');
  if(NAMEJUDGE.split?.confidence==='low') metaNotes.push('名字と名前の切れ目があいまいなので、おおまかに見ています。');
  const noteHTML=metaNotes.length?`<div class="dm-note">${metaNotes.join('<br>')}</div>`:'';
  const cards=buildPlainInsightGrid([
    {kicker:'印象',title:'人にどう伝わりやすいか',body:plain?.overview||'名前から伝わる印象はまだ読み取れていません。'},
    {kicker:'場面',title:'新しい場所で出やすい傾向',body:plain?.timing||'新しい場所で出やすい傾向はまだ読み取れていません。'},
    {kicker:'活かし方',title:'長く見ると活きやすい動き',body:plain?.advice||'長く見ると活きやすい動きはまだ読み取れていません。'},
  ]);

  wrap.innerHTML=nameHead+noteHTML+cards;
}

function renderReactionProfile(){
  const wrap=document.getElementById('r-reaction-content');
  if(!wrap) return;
  if(!REACTION_PROFILE){
    wrap.innerHTML=`<div style="font-size:13px;color:var(--muted);font-family:'Shippori Mincho',serif;line-height:2;padding:16px 0">
      魂の本質診断が未入力のため、このレイヤーは省略しました。<br>
      入力画面で答えると、ストレスが出やすい場面と力の出し方を補足できます。
    </div>`;
    return;
  }
  const evidenceText=REACTION_PROFILE.evidence?.length?REACTION_PROFILE.evidence.join(' / '):'';
  const note=`<div class="dm-note">${REACTION_PROFILE.summary}<br>反応が出やすい場面：${REACTION_PROFILE.stress}<br>力が出やすい動き：${REACTION_PROFILE.power}<br>${REACTION_PROFILE.handling}${evidenceText?`<br>回答の手がかり：${evidenceText}`:''}</div>`;
  const insightHTML=`
    <div class="insight-grid">
      <div class="insight-card">
        <div class="insight-kicker">場面</div>
        <div class="insight-title">引っかかりやすい場面</div>
        <div class="insight-copy">${REACTION_PROFILE.stress}</div>
      </div>
      <div class="insight-card">
        <div class="insight-kicker">力</div>
        <div class="insight-title">力の出し方</div>
        <div class="insight-copy">${REACTION_PROFILE.power}</div>
      </div>
      <div class="insight-card">
        <div class="insight-kicker">整え方</div>
        <div class="insight-title">整いやすい条件</div>
        <div class="insight-copy">${REACTION_PROFILE.handling}</div>
      </div>
    </div>`;
  wrap.innerHTML=note+insightHTML;
}

function renderCards(){
  const lr=document.getElementById('r-len-cards');
  const or=document.getElementById('r-orc-cards');
  if(lr) lr.style.display='none';
  if(or) or.style.display='none';
  // 性別カード（事前配置）＋引いた9枚
  const lenAll=FIXED_GENDER_CARD?[FIXED_GENDER_CARD,...SEL_LEN]:SEL_LEN;
  if(lr) lr.innerHTML=lenAll.map((id,i)=>{
    const isFixed=FIXED_GENDER_CARD&&i===0;
    const base=makeSmCard(id,'len');
    return isFixed?base.replace('class="card-sm"','class="card-sm" style="border-color:rgba(201,149,42,.7)"'):base;
  }).join('');
  if(or) or.innerHTML=SEL_ORC.map(id=>makeSmCard(id,'orc')).join('');
  if(lr&&lenAll.length) lr.style.display='flex';
  if(or&&SEL_ORC.length) or.style.display='flex';
}

function makeSmCard(id,type){
  const d=type==='len'?LENORMAND[id]:ORACLE[id];
  const imgSrc=type==='len'?`images/lenormand/${String(id).padStart(2,'0')}.png`:`images/oracle/${String(id).padStart(2,'0')}.png`;
  return`<div class="card-sm" title="No.${id} ${d.name}" onclick="showToast('No.${id} ${d.name}')">
    <img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;" onerror="this.style.display='none'" alt="">
    <div class="card-sm-ph" style="position:absolute;inset:0;z-index:-1">
      <div class="card-sm-num">${id}</div>
      <div class="card-sm-name">${d.name}</div>
    </div>
  </div>`;
}

// ─── ①あなたという人（四柱推命＋LP＋姓名判断を統合した人間語）────────────
async function runBasicInfo(){
  const stageStartedAt=Date.now();
  setResultStageStatus('basic','working');
  LAST_OUTPUTS.about=buildFoundationSummaryOutput();
  LAST_OUTPUTS.foundationDeep='';
  await ensureStageMinimumTime('basic',stageStartedAt);
  setResultStageStatus('basic','done');
}

function parseCombinedPaidReading(raw=''){
  const sections={len:'',orc:'',integration:''};
  const normalized=String(raw||'').replace(/\r\n?/g,'\n');
  const lines=normalized.split('\n');
  let current='';
  const bucket={len:[],orc:[],integration:[]};
  lines.forEach(line=>{
    const trimmed=line.trim();
    if(/^===\s*LEN\s*===$/i.test(trimmed)){ current='len'; return; }
    if(/^===\s*ORC\s*===$/i.test(trimmed)||/^===\s*ORACLE\s*===$/i.test(trimmed)){ current='orc'; return; }
    if(/^===\s*INTEGRATION\s*===$/i.test(trimmed)){ current='integration'; return; }
    if(current) bucket[current].push(line);
  });
  sections.len=bucket.len.join('\n').trim();
  sections.orc=bucket.orc.join('\n').trim();
  sections.integration=bucket.integration.join('\n').trim();
  return sections;
}

function renderPaidCombinedOutputs(parsed,name,cat,theme){
  LAST_OUTPUTS.len=parsed.len||buildRichLenFallback(name,cat);
  LAST_OUTPUTS.orc=parsed.orc||buildRichOrcFallback(name,cat,true);
  LAST_OUTPUTS.integration=parsed.integration||buildIntegratedFallback(name,cat,theme);
  renderFormattedResultText('r-len-block',LAST_OUTPUTS.len,'len');
  renderFormattedResultText('r-orc-block',LAST_OUTPUTS.orc,'orc');
  document.getElementById('r-aiload').style.display='none';
  document.getElementById('r-integration').style.display='block';
  renderFormattedResultText('r-integration',LAST_OUTPUTS.integration,'integration');
}

async function completeResultGenerationUI(){
  const progressCard=document.getElementById('result-progress-card');
  if(progressCard) progressCard.style.display='none';
  renderPremiumDossier(false);
  persistCurrentReading();
  renderMemberFollowupSection();
  renderReturnRitual();
  document.getElementById('progress').style.width='100%';
  setTimeout(()=>{
    const shareBtn=document.getElementById('share-x-btn');
    if(shareBtn) shareBtn.style.display='inline-flex';
    const saveBtn=document.getElementById('dossier-save-btn');
    if(saveBtn) saveBtn.style.display=PLAN==='paid'?'inline-flex':'none';
    const copyBtn=document.getElementById('dossier-copy-inline-btn');
    if(copyBtn) copyBtn.style.display=PLAN==='paid'?'inline-flex':'none';
  },800);
}

async function runPaidCombinedReading(){
  const lenStageStartedAt=Date.now();
  setResultStageStatus('len','working');
  setReadingBlockLoading('r-len-block','いま起きていることを整理しています','迷いを増やす説明ではなく、状況の核心と判断材料だけを言葉にしています。');
  setReadingBlockLoading('r-orc-block','背景と本質を読み解いています','背景の流れと、その人らしい整え方が自然につながるようにまとめています。');
  setIntegrationLoading('結論を整えています','ここまでの読みを一本にまとめ、今どう動くかまで落とし込んでいます。');

  const name=document.getElementById('f-fullname')?.value||'あなた';
  const cat=document.getElementById('f-cat')?.value||'総合';
  const theme=document.getElementById('f-theme')?.value||'';
  const focus=analyzeConsultationFocus(cat,theme);
  const lenSpreadContext=buildLenSpreadPromptContext(cat);
  const lenFull=SEL_LEN.length===9
    ?`${lenSpreadContext.cardDetails}
【行の読み】
${lenSpreadContext.rowDetails}
【列の読み】
${lenSpreadContext.columnDetails}
【補助線】
${lenSpreadContext.diagonalDetails}
【隣接ペア】
${lenSpreadContext.pairDetails}
【3連鎖】
${lenSpreadContext.chainDetails}
【中心十字・角・距離】
${[lenSpreadContext.crossDetails,lenSpreadContext.cornerDetails,lenSpreadContext.distanceDetails].filter(Boolean).join('\n')}
【対称ペア・ナイト・テーマ周辺】
${[lenSpreadContext.mirrorPairDetails,lenSpreadContext.knightDetails,lenSpreadContext.topicFocusDetails].filter(Boolean).join('\n')}`
    :`${lenSpreadContext.cardDetails}
【隣接ペア】
${lenSpreadContext.pairDetails}
【3連鎖】
${lenSpreadContext.chainDetails}`;
  const orcFull=SEL_ORC.map((id,i)=>{
    const o=ORACLE[id];
    const kw=o.keywords?o.keywords.join('・'):'';
    return`${getOrcSpreadLabel(i,SEL_ORC.length)}：No.${id}「${o.name}」${o.master?' ★マスターナンバー':''}\n  本質：${o.essence||''} ／ キーワード：${kw}\n  メッセージ：${o.msg}`;
  }).join('\n');
  const birthPlain=buildBirthPlainInsight(MEIMEI);
  const namePlain=buildNamePlainInsight(NAMEJUDGE);
  const reactionText=buildReactionPromptSnippet();
  const clarifyText=buildClarifyPromptText('compact');
  const birthDetail=birthPlain?[birthPlain.overview,birthPlain.timing,birthPlain.advice].filter(Boolean).join(' '):'なし';
  const nameDetail=namePlain?[namePlain.overview,namePlain.timing,namePlain.advice].filter(Boolean).join(' '):'なし';
  const lifeDetail=buildLifePatternPlainText();

  const systemPrompt=`あなたは、占いに詳しくない人でも「話が早い」「ちゃんと分かる」と感じる一流の鑑定者です。
役割は、ルノルマンを主軸に、オラクルを補助線として使い、相談者が判断できる文章を書くことです。

${buildDecisionSupportPromptGuide(cat,theme)}

【優先順位】
- 主軸はルノルマン
- オラクルは気持ちの整理と補助線
- 最後の結論は、ルノルマンの流れを上書きしない

【絶対禁止】
- カード名、枚数、並び、占術名、システム説明
- キーワード列挙
- きれいごとだけの励まし
- 長い前置き

【出力ルール】
- 冒頭1〜2文で結論と核心を短く言い切る
- その後は、背景・分岐点・判断材料を必要なだけ掘ってよい
- ただし脱線、重複、同じ意味の言い換えは禁止
- 難しい言葉を使わない
- 相談者は忙しく、理解も速くない前提で書く
- 最初の2文で結論が伝わるようにする
- 行動は7日以内にできる内容だけにする
- 隣接2枚は、前のカードを主役、後のカードを修飾として読む
- 3枚連鎖は途中で切らず、一本の流れとして読む
- ${SEL_LEN.length===9?'9枚では⑤の中心十字、角、対称ペア、距離差、ナイト先、テーマカード周辺を補助根拠に使う':'3枚では背景→核心→次の流れを一直線にまとめ、前後2ペアの差も判断材料にする'}

【出力形式】
必ず次の3ブロックをこの順で返すこと。

===LEN===
■ 今の流れ
■ 気をつけること
■ 次にやること

===ORC===
■ 今の気持ち
■ 魂の本質
■ 次にとる行動

===INTEGRATION===
■ 結論
■ 判断ポイント
■ 次にやること`;

  const prompt=`【相談者】${name}さん
【相談テーマ】${cat}「${theme||'全般'}」
【相談者が欲しい答え】${focus.answerNeed}

【生まれから見える傾向】
${birthDetail}

【名前から伝わる印象】
${nameDetail}

【誕生日から見える行動の癖】
${lifeDetail}

【魂の本質診断から見える傾向】
${reactionText}

【ルノルマン${SEL_LEN.length}枚（全カード詳細）】
${lenFull}

【数秘オラクル${SEL_ORC.length}枚（全カード詳細）】
${orcFull}
${clarifyText}

ルノルマンを主軸に読み、オラクルは補助線として使ってください。
出力ではカード名や占術名を一切出さず、相談者の現実の言葉に翻訳してください。`;

  let parsed={len:'',orc:'',integration:''};
  try{
    const res=await callAI(prompt,3200,systemPrompt,{
      taskKey:'paid',
      images:buildCardImageRefs('all','paid'),
    });
    parsed=parseCombinedPaidReading(res);
  }catch(e){}

  renderPaidCombinedOutputs(parsed,name,cat,theme);

  await ensureStageMinimumTime('len',lenStageStartedAt);
  setResultStageStatus('len','done');

  const orcStageStartedAt=Date.now();
  setResultStageStatus('orc','working');
  await ensureStageMinimumTime('orc',orcStageStartedAt);
  setResultStageStatus('orc','done');

  const integrationStageStartedAt=Date.now();
  setResultStageStatus('integration','working');
  await ensureStageMinimumTime('integration',integrationStageStartedAt);
  setResultStageStatus('integration','done');
  await completeResultGenerationUI();
}

// ─── ②ルノルマンリーディング（完全版ナレッジベース使用）────────────────
async function runLenReading(){
  const stageStartedAt=Date.now();
  setResultStageStatus('len','working');
  setReadingBlockLoading('r-len-block','いま起きていることを整理しています','迷いを増やす説明ではなく、状況の核心と判断材料だけを言葉にしています。');
  const name=document.getElementById('f-fullname')?.value||'あなた';
  const cat=document.getElementById('f-cat')?.value||'総合';
  const theme=document.getElementById('f-theme')?.value||'';
  const focus=analyzeConsultationFocus(cat,theme);
  const is9=(SEL_LEN.length===9);
  const is3=(SEL_LEN.length===FREE_LEN_COUNT);
  const lenSpreadContext=buildLenSpreadPromptContext(cat);
  const lenInfo=lenSpreadContext.cardDetails;
  const spreadAxisInfo=is9
    ?`\n【行の読み】\n${lenSpreadContext.rowDetails}\n【列の読み】\n${lenSpreadContext.columnDetails}\n【補助線】\n${lenSpreadContext.diagonalDetails}`
    :is3
      ?`\n【3枚の位置】\n- 左：背景\n- 中央：現状の核心\n- 右：次の流れ`
      :'';
  const pairAndChainInfo=`\n【隣接ペア】\n${lenSpreadContext.pairDetails}\n【3連鎖】\n${lenSpreadContext.chainDetails}`;
  const advancedLenInfo=is9
    ?`\n【中心十字・角・距離】\n${[lenSpreadContext.crossDetails,lenSpreadContext.cornerDetails,lenSpreadContext.distanceDetails].filter(Boolean).join('\n')}\n【対称ペア・ナイト・テーマ周辺】\n${[lenSpreadContext.mirrorPairDetails,lenSpreadContext.knightDetails,lenSpreadContext.topicFocusDetails].filter(Boolean).join('\n')}`
    :'';

  // テーマ別キーカード確認（9枚引き時）
  const themeKey={恋愛:24,結婚:25,仕事:35,金運:34,健康:5,転職:17,秘密:26,問題解決:33,人間関係:20};
  const keyCard=themeKey[cat]||(cat==='仕事'?35:cat==='金運'?34:null);
  const keyCardInSpread=keyCard&&SEL_LEN.includes(keyCard)?`\n※テーマ別キーカード「${LENORMAND[keyCard]?.name}」(No.${keyCard})が出ています。このカードを中心に読んでください。`:'';

  // 曖昧カード検出（対話型絞り込み候補）
  const ambigIds=SEL_LEN.filter(id=>[6,22,26].includes(id));
  const ambigInfo=ambigIds.length>0?`\n【曖昧カード出現】${ambigIds.map(id=>LENORMAND[id].name).join('・')}が出ています。複数の解釈が可能なため、相談テーマ「${cat}：${theme}」に最も近い意味で解釈してください。解釈に迷う場合は「〜の可能性と〜の可能性が示されています」と両方伝えてください。`:'';

  // 人物カード検出
  const personIds=SEL_LEN.filter(id=>[7,15,18].includes(id));
  const personInfo=personIds.length>0?`\n【人物カード出現】${personIds.map(id=>LENORMAND[id].name).join('・')}は特定の人物を指している可能性があります。`:'';

  // 雲カード特殊ルール適用
  const cloudIdx=SEL_LEN.indexOf(6);
  const cloudInfo=cloudIdx>=0&&is9?`\n【雲カード特殊ルール】雲(⑤基準で)左側のカードには展望あり・改善の兆候、右側のカードには悪化・停滞の意味が加わります。`:'';

  // 指輪カード特殊ルール
  const ringIdx=SEL_LEN.indexOf(25);
  const ringInfo=ringIdx>=0&&is9?`\n【指輪カード特殊ルール】指輪は⑤より左側=ネガティブ（束縛・浮気）、右側=ポジティブ（結婚・深い約束）。現在位置は${['①','②','③','④','⑤','⑥','⑦','⑧','⑨'][ringIdx]}です。`:'';


  const systemPrompt=`あなたは、「答えを出す」ことを使命とする一流の鑑定者です。
役割は状況を説明することではなく、「相談者が今日から動ける判断材料」を与えることです。
カードは内部で使い切り、出力にはカード名もシステム説明も一切出さない。

${buildDecisionSupportPromptGuide(cat,theme)}

【絶対禁止 ─ これをやると鑑定書として失敗とみなす】
- カード名、カード枚数、並び、過去/現在/未来、顕在/潜在、占術名、システム説明
- 「〜のカードが出ているので」「配置では〜」のような書き方
- 「〜かもしれません」「〜の可能性があります」「〜ではないでしょうか」の弱い言い回し
- キーワードの列挙や辞書の焼き直し
- 「自分を信じて」「焦らずに」など精神論だけで終わること
- 抽象的な「良い変化」「好転の流れ」だけで行動が示されない文章

【警戒重視の読み方】
- 出ているカードにネガティブな意味のもの（障害・損失・終わり・不信・停滞・争い・嫉妬など）があれば、それを「警告」として■今の流れか■気をつけることで正直に前面に出す
- 「この状況では〜になりやすい」「〜に注意が必要です」と言い切る
- ただし同時に、以下のカードが出ているときは「改善の兆し」として必ずセットで伝える
  → 騎士(1)：好転の知らせが近づいているサイン
  → コウノトリ(17)：状況が動き始めている・変化の始まり
  → 星(16)：見通しが開けてくるサイン
  → 太陽(31)：問題解決・明るい転換が来るサイン
  → 鍵(33)：答えが出る・扉が開くサイン
  → クローバー(2)：思わぬ小さな好機が潜んでいる
- 「どこに危険があって、どこに光があるか」を分けて示すことで、相談者が判断できる地図を作る

【内部での使い方】
- ${is9?'9枚引きでは、列を「背景→現状→未来」、行を「顕在意識→現実→潜在意識」として必ず重ね読みする':is3?'3枚引きでは、左を背景、中央を現状の核心、右を次の流れとして読み、相談者がどこで止まっているかを一直線に整理する':'1枚引きでは、背景と現状をひと続きで整理し、次の一歩まで落とし込む'}
- ${is9?'左列は背景・原因、中列は現在地と核心、右列は今のまま進んだ場合の近い未来として扱う':is3?'背景・現状・近い未来を分けつつ、結論は一つの流れとしてまとめる':'カードの意味をそのまま見せず、相談者の現実の悩みに翻訳する'}
- ${is9?'上段は本人が意識していること、中段は現実に起きていること、下段はまだ言語化しきれていない本音や深層反応として扱う':is3?'中央のカードを核心として扱い、左右をその理由と次の展開として読む':'相談者が最初に知りたい答えを先に言う'}
- ${is9?'中央⑤は核心だが、中心単独で決めつけず、行と列の交点として読む':is3?'続ける場合と切り替える場合の見え方に差があるなら、その差を判断材料として具体化する':'続ける場合と切り替える場合の見え方の差を、判断材料として具体化する'}
- ${is9?'行と列の内容にズレがある場合は、そのズレ自体を「認識と現実の差」「背景と未来のねじれ」として重要視する':'論点が複数ある場合は必ず分ける'}
- 隣接2枚は、前のカードを主役、後のカードを修飾として読む
- 3枚連鎖は、途中で切らず一文の流れとして読む
- ${is9?'9枚では⑤の中心十字、角、対称ペア、距離差、ナイト先、テーマカード周辺を補助根拠として使う':'左右2つの隣接ペアの差を、背景と次の流れの差として使う'}
- 提供データは内部参考としてのみ使い、出力ではすべて現実の悩みに翻訳する
- 論点が複数ある場合は必ず分ける
- 相談者が最初に知りたい答えを冒頭で言い切る
- 続ける場合と切り替える場合の見え方の差を、判断材料として具体化する

【出力形式】
見出し以外の前置きは不要。次の3見出しだけで書くこと。

■ 今の流れ
ここに至る背景と、いま起きていることを整理する。冒頭1〜2文で結論と核心を言い切る。その後は必要なら背景や分岐点を掘ってよい。

■ 気をつけること
ここがこの鑑定の核心です。現実に起きている・または近く起きやすいリスク（ネガティブカードの示す警告）を正直に言い切る。「かもしれない」で逃げず「〜になりやすい」と伝える。改善の兆しや好転の余地が見えるカードがあれば、必ず「一方で〜という兆しもある」とセットで伝える。
${focus.isDualConcern?`恋愛と仕事が両方あるので、必要なら「恋愛では」「仕事では」と分けて整理する。`:''}

■ 次にやること
抽象論を禁止。今日から7日以内にできる動きを3つ以内で、実行しやすい順で書く。

合計${is9?'900字前後':is3?'520字前後':'260字前後'}。冒頭だけは短く締め、その後は脱線しない範囲で必要なら深く書いてよい。1文は短く、難しい言葉は禁止。`;
  // 絞り込み回答があれば注入
  const clarifyText=buildClarifyPromptText('detail');
  const fixedCardText=FIXED_GENDER_CARD
    ?`【相談者を表す事前配置カード】No.${FIXED_GENDER_CARD}「${LENORMAND[FIXED_GENDER_CARD].name}」（${GENDER==='male'?'男性':'女性'}相談者を象徴。⑤の核心として強く影響する）\n`
    :'';
  const userPrompt=`【相談者】${name}さん
【相談テーマ】${cat}「${theme||'全般'}」
【相談者が欲しい答え】${focus.answerNeed}
${fixedCardText}
【引いた${SEL_LEN.length}枚のカード（全データ）】
${lenInfo}${spreadAxisInfo}${pairAndChainInfo}${advancedLenInfo}
${keyCardInSpread}${ambigInfo}${personInfo}${cloudInfo}${ringInfo}${clarifyText}

上記の全情報を内部で使い切りつつ、出力ではカードや占術の説明を完全に消してください。
${name}さんが読みたいのは「背景から何が続いているか」「いま何を意識しておくべきか」「今週どう動けばいいか」です。
${buildReadingOutputFormatGuide('len')}`;

  try{
    const res=await callAI(userPrompt,is9?4600:(is3?1800:650),systemPrompt,{
      taskKey:PLAN==='paid'?'paid':'free',
      images:buildCardImageRefs('len',PLAN==='paid'?'paid':'free'),
    });
    LAST_OUTPUTS.len=res;
    renderFormattedResultText('r-len-block',res,'len');
  }catch(e){
    LAST_OUTPUTS.len=buildRichLenFallback(name,cat);
    renderFormattedResultText('r-len-block',LAST_OUTPUTS.len,'len');
  }
  await ensureStageMinimumTime('len',stageStartedAt);
  setResultStageStatus('len','done');
}

// ─── ③数秘オラクルリーディング ─────────────────────────────────────────
async function runOrcReading(){
  const stageStartedAt=Date.now();
  setResultStageStatus('orc','working');
  setReadingBlockLoading('r-orc-block','背景と本質を読み解いています','背景の流れと、その人らしい整え方が自然につながるようにまとめています。');
  const name=document.getElementById('f-fullname')?.value||'あなた';
  const cat=document.getElementById('f-cat')?.value||'総合';
  const theme=document.getElementById('f-theme')?.value||'';
  const focus=analyzeConsultationFocus(cat,theme);
  const is3=(SEL_ORC.length===3);
  const orcLabels=getOrcSpreadLabels();
  const orcInfo=SEL_ORC.map((id,i)=>{const o=ORACLE[id];const kw=o.keywords?o.keywords.join('・'):'';return`${orcLabels[i]||''}：No.${id}「${o.name}」${o.master?' ★マスターナンバー':''}\n本質：${o.essence||''} ／ キーワード：${kw}\nメッセージ：${o.msg}`;}).join('\n');
  const lpCard=LP?ORACLE[LP]:null;
  const lpGuide=LP
    ?'誕生日から見えるその人らしさと、今回の状況のつながりを必ず見出すこと。'
    :'誕生日の日が未入力のため、この観点への言及はせず、引いたカード同士の流れから本質と行動を読んでください。';
  const clarifyText=buildClarifyPromptText('compact');
  const birthPlain=buildBirthPlainInsight(MEIMEI);
  const namePlain=buildNamePlainInsight(NAMEJUDGE);
  const reactionText=buildReactionPromptSnippet();
  const baseEssenceText=`【生まれから見える傾向】
${birthPlain?[birthPlain.overview,birthPlain.timing,birthPlain.advice].filter(Boolean).join(' '):'なし'}

【名前から伝わる傾向】
${namePlain?[namePlain.overview,namePlain.timing,namePlain.advice].filter(Boolean).join(' '):'なし'}

【魂の本質診断】
${reactionText}`;

  const systemPrompt=`あなたは、弱っている相談者の頭を余計に混乱させず、自然に前を向かせる一流の鑑定者です。
役割は気持ちを甘やかすことではなく、迷いの扱い方と「次にとる具体的な行動」を分かりやすく言葉にすることです。
オラクルカードはアドバイスの媒体です。各カードのメッセージを相談者への行動提案に変換することが最重要の仕事です。

${buildDecisionSupportPromptGuide(cat,theme)}

【絶対禁止】
- カード名、枚数、並び、過去/現在/未来、占術名、システム説明
- メッセージの丸写し
- 「カードが示すのは〜」という説明口調
- 根拠の薄い断言
- 「あなたの本質」をカードの解釈だけで埋めること

【内部での使い方】
- 提供データは、相談者の感情の流れと立て直し方へ翻訳して使う
- ${is3?'左（背景）は何がこの状況を生み出してきたかのエネルギー源として読む。中（現状）はそのエネルギーが今どのように表れているかを読む。右（未来）は背景と現状の流れが自然に向かう先と、そのために今できる動きを読む。3枚の間に一本の流れを作ること':'1枚引きでは、いま抱えている気持ちと整え方を一本で読む'}
- ${lpGuide}
${LP&&lpCard?.master?`- ライフパスナンバー${LP}はマスターナンバーであり、通常の数字より高い感受性・使命感・精神的緊張を伴う。${LP===11?'直感と霊的洞察が突出している一方、神経的な過敏さや現実との乖離に悩みやすい。':LP===22?'大きな夢を現実に構築する力を持つが、その重圧が自己不信や燃え尽きに転じやすい。':'高い愛と奉仕の使命を持つが、自己犠牲の限界を超えやすく、まず自分自身を満たすことが先決。'}この特性を踏まえ、相談者の悩みの根に触れること。`:''}
${is3&&SEL_ORC.some(id=>ORACLE[id]?.master)?`- 引いたカードの中にマスターナンバーが含まれている。そのポジションのエネルギーはより強く・繊細に現れており、課題と才能の両面が際立つ。その深さを読み取ること。`:''}
- 「あなたの本質」は四柱推命・姓名判断・魂の本質診断から見える、その人の根っこの性質だけを書く
- 【魂の本質（■魂の本質 セクション）の最重要ルール】魂の本質診断のsummaryとstressを必ず核心として使うこと。名前・生まれの情報はあくまで補足として添えるにとどめ、魂の本質診断の内容を軸とすること。魂の本質診断が未入力の場合は、その旨を一文で記したうえで名前・生まれから補足する
- 行動は、無理なく実行できる順番にする

【出力形式】
次の3見出しだけで書くこと。

■ 今の気持ち
ここまでの流れと、いま抱えすぎていることを整理する。冒頭1〜2文で結論と本質を言い切る。その後は必要なら感情の流れまで掘ってよい。

■ 魂の本質
その人の根っこの性質と、いま本当に引っかかっている点を書く。短く始め、その後は必要なら少し深く書いてよい。

■ 次にとる行動
気持ちの整理より「何をするか」を優先する。引いたカードのメッセージを「今週これをやってみてください」という行動提案に変換する。複数カードが同じ方向を指しているなら、それを最重要行動として前に出す。行動は2〜3個まで、「〜する」「〜を確認する」「〜を止める」のように動詞で始める。

合計${is3?'760字前後':'320字前後'}。冒頭だけは短く締め、その後は脱線しない範囲で必要なら深く書いてよい。1文は短く、難しい言葉は禁止。`;

  const userPrompt=`【相談者】${name}さん
【相談テーマ】${cat}「${theme||'全般'}」
【相談者が欲しい答え】${focus.answerNeed}

${LP?`【ライフパスナンバー：${LP}${lpCard?.master?' (マスターナンバー)':''}】
カード名：「${lpCard?.name||''}」
本質：${lpCard?.essence||''}
キーワード：${lpCard?.keywords?.join('・')||''}
ヒント：${lpCard?.msg||''}
数秘的意味：${lpCard?.note||''}`:`【補足】
誕生日の日が未入力のため、今回はこの観点を使わず、引いたカード同士の流れを優先して読んでください。`}

${baseEssenceText}

【引いた${SEL_ORC.length}枚のカード（全データ）】
${orcInfo}${clarifyText}

上記の全情報を内部で使い切りつつ、出力ではカードや占術の説明を完全に消してください。
${name}さんが読みたいのは「背景から何が続いているか」「自分の本質はどこにあるか」「どう整えれば望む未来へ近づけるか」です。
${buildReadingOutputFormatGuide('orc')}`;

  try{
    const res=await callAI(userPrompt,is3?4600:700,systemPrompt,{
      taskKey:PLAN==='paid'?'paid':'free',
      images:buildCardImageRefs('orc',PLAN==='paid'?'paid':'free'),
    });
    LAST_OUTPUTS.orc=res;
    renderFormattedResultText('r-orc-block',res,'orc');
  }catch(e){
    LAST_OUTPUTS.orc=buildRichOrcFallback(name,cat,is3);
    renderFormattedResultText('r-orc-block',LAST_OUTPUTS.orc,'orc');
  }
  await ensureStageMinimumTime('orc',stageStartedAt);
  setResultStageStatus('orc','done');
}

// ─── ④統合メッセージ ─────────────────────────────────────────────────
async function runIntegration(){
  const stageStartedAt=Date.now();
  setResultStageStatus('integration','working');
  setIntegrationLoading('結論を整えています','ここまでの読みを一本にまとめ、今どう動くかまで落とし込んでいます。');
  const name=document.getElementById('f-fullname')?.value||'あなた';
  const cat=document.getElementById('f-cat')?.value||'総合';
  const theme=document.getElementById('f-theme')?.value||'';
  const focus=analyzeConsultationFocus(cat,theme);
  const is9=(SEL_LEN.length===9);
  const lenSpreadContext=buildLenSpreadPromptContext(cat);
  const lpCard=LP?ORACLE[LP]:null;

  const lenFull=is9
    ?`${lenSpreadContext.cardDetails}
【行の読み】
${lenSpreadContext.rowDetails}
【列の読み】
${lenSpreadContext.columnDetails}
【補助線】
${lenSpreadContext.diagonalDetails}`
    :lenSpreadContext.cardDetails;

  // オラクル全カード詳細
  const orcFull=SEL_ORC.map((id,i)=>{
    const o=ORACLE[id];
    const kw=o.keywords?o.keywords.join('・'):'';
    return`${getOrcSpreadLabel(i,SEL_ORC.length)}：No.${id}「${o.name}」${o.master?' ★マスターナンバー':''}\n  本質：${o.essence||''} ／ キーワード：${kw}\n  メッセージ：${o.msg}`;
  }).join('\n');

  // 補足回答
  const clarifyFull=buildClarifyPromptText('compact');
  const hasClarify=hasClarifyAnswers();
  const targetChars=hasClarify?'3000':'2500';

  const birthPlain=buildBirthPlainInsight(MEIMEI);
  const namePlain=buildNamePlainInsight(NAMEJUDGE);
  const birthDetail=birthPlain?[birthPlain.overview,birthPlain.timing,birthPlain.advice].filter(Boolean).join(' '):'なし';
  const nameDetail=namePlain?[namePlain.overview,namePlain.timing,namePlain.advice].filter(Boolean).join(' '):'なし';
  const lifeDetail=buildLifePatternPlainText();
  const reactionText=buildReactionPromptSnippet();

  const systemPrompt=`あなたはプロの占い師です。この統合メッセージは鑑定の締めくくりであり、相談者が最後に持ち帰る「答え」です。
最優先の使命は「結論を出す」ことです。「様子を見て」「信じて」だけで終わる文章は失敗とみなします。

【カード間の優先順位】
- ルノルマンは現実・状況・タイムラインを示す主軸。統合の結論はルノルマンの流れを上書きしない
- オラクルは本人の内面・動機・行動の整え方を示す補助線
- 結論はルノルマンの現実診断を土台に、オラクルで方向性を補強する形にする

${buildDecisionSupportPromptGuide(cat,theme)}

【絶対禁止】
- カード名、占術名、システム説明
- 個別解釈の繰り返し（前のセクションの焼き直し）
- 「〜かもしれません」「〜の可能性があります」の弱い言い回し
- 優しいだけで何も決められない文章
- 抽象的な励ましで行動が示されない文章

【出力形式・厳守】
次の3見出しだけで書くこと。見出し以外の前置きは不要。

■ 結論
最初の2文で「進む・止まる・様子を見る」のどれかを断言する。「なぜそうなのか」を一言で支える根拠もセットで書く。

■ 判断ポイント
「進んでよい条件」と「止まるべき条件」を分けて書く。条件は「○○が確認できたら進む」「○○が起きたら止まる」の形で具体的に書く。
${focus.isDualConcern?`恋愛と仕事が両方あるので、「恋愛では〜、仕事では〜」と分けて整理する。`:''}

■ 次にやること
今日から7日以内にやることを3つまで、1行ずつ、「〜する」「〜を確認する」「〜を止める」の動詞形で書く。精神論は禁止。

合計700字前後。1文は短く、難しい言葉は禁止。`;

 const prompt=`【相談者】${name}さん
【相談テーマ】${cat}「${theme||'全般'}」

【基礎情報まとめ】
【生まれから見える傾向】
${birthDetail}

【名前から伝わる印象】
${nameDetail}

【誕生日から見える行動の癖】
${lifeDetail}

【魂の本質診断から見える傾向】
${reactionText}

【ルノルマン${SEL_LEN.length}枚（全カード詳細）】
${lenFull}

【数秘オラクル${SEL_ORC.length}枚（全カード詳細）】
${orcFull}
${clarifyFull}

以上を踏まえ、${name}さんへの統括メッセージを書いてください。
出力ではカードや占術の説明を一切出さず、読み手が行動に移れる文章だけを残してください。
${buildReadingOutputFormatGuide('integration')}`;

  try{
    const res=await callAI(prompt,1800,systemPrompt,{
      taskKey:PLAN==='paid'?'paid':'free',
      images:buildCardImageRefs('all',PLAN==='paid'?'paid':'free'),
    });
    LAST_OUTPUTS.integration=res;
    document.getElementById('r-aiload').style.display='none';
    document.getElementById('r-integration').style.display='block';
    renderFormattedResultText('r-integration',res,'integration');
  }catch(e){
    LAST_OUTPUTS.integration=buildIntegratedFallback(name,cat,theme);
    document.getElementById('r-aiload').style.display='none';
    document.getElementById('r-integration').style.display='block';
    renderFormattedResultText('r-integration',LAST_OUTPUTS.integration,'integration');
  }
  await ensureStageMinimumTime('integration',stageStartedAt);
  setResultStageStatus('integration','done');
  const progressCard=document.getElementById('result-progress-card');
  if(progressCard) progressCard.style.display='none';
  renderPremiumDossier(false);
  persistCurrentReading();
  renderMemberFollowupSection();
  renderReturnRitual();
  document.getElementById('progress').style.width='100%';
  setTimeout(()=>{
    const shareBtn=document.getElementById('share-x-btn');
    if(shareBtn) shareBtn.style.display='inline-flex';
    const saveBtn=document.getElementById('dossier-save-btn');
    if(saveBtn) saveBtn.style.display=PLAN==='paid'?'inline-flex':'none';
    const copyBtn=document.getElementById('dossier-copy-inline-btn');
    if(copyBtn) copyBtn.style.display=PLAN==='paid'?'inline-flex':'none';
  },800);
}

function buildPremiumDossierSourceContext(){
  const input=getCurrentInputSnapshot();
  const focus=analyzeConsultationFocus(input.cat,input.theme);
  const lenNames=SEL_LEN.map(id=>`No.${id} ${LENORMAND[id]?.name||''}`).join(' / ');
  const orcNames=SEL_ORC.map(id=>`No.${id} ${ORACLE[id]?.name||''}`).join(' / ');
  const clarifyText=buildClarifyPromptText('plain');
  const birthPlain=buildBirthPlainInsight(MEIMEI);
  const namePlain=buildNamePlainInsight(NAMEJUDGE);
  const reactionText=buildReactionPromptSnippet();
  const birthText=birthPlain?[birthPlain.overview,birthPlain.timing,birthPlain.advice].filter(Boolean).join(' '):'なし';
  const nameText=namePlain?[namePlain.overview,namePlain.timing,namePlain.advice].filter(Boolean).join(' '):'なし';
  const lifeText=buildLifePatternPlainText();
  const foundationDeepText=LAST_OUTPUTS.foundationDeep||buildFoundationDeepFallback();
  return{
    input,
    focus,
    contextText:`【相談者】${input.fullname||'あなた'}さん
【相談テーマ】${input.cat||'総合'}「${input.theme||'全般'}」
【相談者が欲しい答え】${focus.answerNeed}
【生まれから見える傾向】${birthText}
【名前から伝わる印象】${nameText}
【誕生日から見える行動の癖】${lifeText}
【魂の本質診断の補足】${reactionText}
【ルノルマン】${lenNames}
【オラクル】${orcNames}
【補足回答】${clarifyText}

【人物像】
${LAST_OUTPUTS.about||'なし'}

【基礎鑑定の統合詳細】
${foundationDeepText}

【ルノルマン鑑定】
${LAST_OUTPUTS.len||'なし'}

【オラクル鑑定】
${LAST_OUTPUTS.orc||'なし'}

【統合メッセージ】
${LAST_OUTPUTS.integration||'なし'}`,
  };
}

async function polishPremiumDossierDraft(draft,sourceContext){
  const systemPrompt=`あなたは最高級の鑑定書を仕上げる編集長です。
役割は、鑑定の中身を薄めずに、冗長さ・重複・矛盾を削り、「答えが出ている」最終稿へ磨き上げることです。
編集の最優先チェックポイント：HEADLINEに「進む・止まる・様子を見る」のどれかが明確に書かれているか。なければ必ず書き直す。

以下を厳守してください。
- 出力は必ず指定タグのみ。タグ名や順番は一切変えない
- HEADLINE は「最初の1文で答えを断言する」形に整える。「〜かもしれない」は削除して言い切りに変換する
- CORE は、魂の本質診断のsummaryとstressを核心として残し、名前・生まれは補足程度に抑える。その人の行動パターンと今の悩みを具体的に結びつける
- TIMING は現実の時系列を基準に整える。「近い将来」「いずれ」などの曖昧な表現は「○週間以内」「○月頃」に変換する
- ACTION7・ACTION30 の各行動は「〜する」「〜を確認する」「〜をやめる」の動詞形に整える。精神論は削除する
- WARNING は「これをすると〜になりやすい」の言い切り形に整える
- カード名、占術名、並び、システム説明は一切出さない
- HEADLINE・CORE・CLOSINGの中身が同じにならないよう各セクションの役割を明確に分ける
- KEYWORDS には、魂の本質診断のタグや判断の軸になる言葉を優先して入れる（カード名は禁止）
- 不安を煽りすぎず、希望だけでも誤魔化さない
- 相談者が占いを知らなくても自然に読める文体にする

出力形式:
[[TITLE]]...[[/TITLE]]
[[SUBTITLE]]...[[/SUBTITLE]]
[[HEADLINE]]最初の1文で答えを断言。2〜3文で根拠[[/HEADLINE]]
[[CORE]]魂の本質診断を軸にその人らしさと今の悩みを結びつける[[/CORE]]
[[TIMING]]「○週間以内」「○月頃」で言い切る[[/TIMING]]
[[ACTION7]]1行ずつ3項目以上。動詞で完結[[/ACTION7]]
[[ACTION30]]1行ずつ3項目以上。動詞で完結[[/ACTION30]]
[[WARNING]]1行ずつ2〜4項目。言い切りで書く[[/WARNING]]
[[LUCK]]1行ずつ2〜4項目。実用的サインとして書く[[/LUCK]]
[[KEYWORDS]]/ 区切りで4〜6個[[/KEYWORDS]]
[[CLOSING]]HEADLINEの繰り返しではなく「この先の自分をどう扱うか」に触れる[[/CLOSING]]`;

  const prompt=`以下は鑑定書の下書きです。
タグ構造は維持したまま、完成度の高い最終稿へ仕上げてください。

【下書き】
${draft}

【元資料】
${sourceContext}`;

  return await callAI(prompt,2800,systemPrompt,{
    taskKey:'dossier',
    images:buildCardImageRefs('all','dossier'),
  });
}

async function runPremiumDossier(){
  const source=buildPremiumDossierSourceContext();

  const systemPrompt=`あなたはトップクラスの占い師兼、鑑定書を仕立てる編集者です。
目的は「普通の長文鑑定」ではなく、相談者が保存して何度も見返したくなるプロ品質の鑑定書を作ることです。
この鑑定書の最大の使命は「答えを出す」ことです。結論が曖昧な鑑定書は価値がありません。

以下を厳守してください。
- HEADLINE では相談者の知りたい答えを冒頭2〜3文で「進む・止まる・様子を見る」のどれかが分かる形で断言する。「〜かもしれない」は禁止
- CORE では、魂の本質診断のsummary（行動パターン）とstress（しんどくなりやすい場面）を軸にその人らしさを描く。名前・生まれは補足として添える程度にとどめる
- TIMING は現実の時系列で近い出来事を言葉にする（「近い将来」などの抽象表現は禁止、「○週間以内」「○月頃」などで言い切る）
- ACTION7 と ACTION30 は「〜する」「〜を確認する」「〜を止める」の動詞形で書く。精神論・励ましは禁止
- WARNING は正直に書く。「注意したほうがよいかも」ではなく「これをすると〜になりやすい」と言い切る
- LUCK は単なる「幸運のサイン」ではなく、「この行動をとると流れが良くなりやすい」という実用的なサインにする
- これまでの鑑定文を繰り返すだけにしない（HEADLINEとCOREとCLOSINGの中身が同じになることは禁止）
- カード名、占術名、並び、システム説明は一切出さない
- 抽象論で逃げず、現実の行動に落とし込む
- KEYWORDS には、魂の本質診断のタグや判断の軸になる言葉を優先して入れる（カード名は禁止）
- 出力は必ず指定タグのみで返し、タグ外には何も書かない

出力形式:
[[TITLE]]...[[/TITLE]]
[[SUBTITLE]]...[[/SUBTITLE]]
[[HEADLINE]]最初の1文で答えを断言。2〜3文で根拠を添える[[/HEADLINE]]
[[CORE]]魂の本質診断のsummary/stressを核心として使う。その人らしい行動パターンと今の悩みの根を結びつける[[/CORE]]
[[TIMING]]「○週間以内」「○月頃」のように時期を言い切る[[/TIMING]]
[[ACTION7]]1行ずつ3項目以上。各行動は動詞で完結[[/ACTION7]]
[[ACTION30]]1行ずつ3項目以上。各行動は動詞で完結[[/ACTION30]]
[[WARNING]]1行ずつ2〜4項目。言い切りで書く[[/WARNING]]
[[LUCK]]1行ずつ2〜4項目。実用的な「流れに乗るサイン」として書く[[/LUCK]]
[[KEYWORDS]]/ 区切りで4〜6個[[/KEYWORDS]]
[[CLOSING]]この鑑定書全体を読んだ相談者へのメッセージ。HEADLINEの繰り返しにせず、「この先の自分をどう扱うか」に触れる[[/CLOSING]]`;

  const prompt=`${source.contextText}

これらすべてを踏まえ、相談者が「これは保存して何度も見返したい」と思うプロ品質の鑑定書を作成してください。
タイトルは安っぽくせず、相談テーマに応じた格式ある表現にしてください。
読み手は占いの仕組みを知らない一般ユーザーなので、専門用語なしで自然に読めることを最優先してください。`;

  try{
    const draft=await callAI(prompt,2800,systemPrompt,{
      taskKey:'dossier',
      images:buildCardImageRefs('all','dossier'),
    });
    LAST_OUTPUTS.dossier=draft||'';
    if(draft){
      try{
        LAST_OUTPUTS.dossier=await polishPremiumDossierDraft(draft,source.contextText);
      }catch(e){
        LAST_OUTPUTS.dossier=draft;
      }
    }
  }catch(e){
    LAST_OUTPUTS.dossier='';
  }
  renderPremiumDossier(false);
}

function getReturnRitualSteps(){
  const input=getCurrentInputSnapshot();
  const cat=input.cat||'総合';
  const theme=input.theme||'全般';
  const themeLabel=theme&&theme!=='全般'?theme:cat;
  return[
    {
      eyebrow:'TODAY',
      body:`今日中に「${themeLabel}」に関する気づきを1つだけメモしてください。鑑定を現実に接続する最初の一歩です。`
    },
    {
      eyebrow:'TOMORROW',
      body:`明日は同じテーマで動いた結果を見返し、感情の変化を確認してください。無料でも流れ、有料なら変化点まで読みやすくなります。`
    },
    {
      eyebrow:isMemberActive()?'THIS WEEK':'NEXT CHECK',
      body:isMemberActive()
        ?'この先は、7日計画か次の転機を追加で深掘りして、来週までの動きを整えられます。'
        :'次回は、状況が少し動いたタイミングで戻るのがおすすめです。会員機能では、前回の続きからそのまま深く読めるようになります。'
    },
  ];
}

function renderReturnRitual(){
  const titleEl=document.getElementById('ritual-title');
  const copyEl=document.getElementById('ritual-copy');
  const gridEl=document.getElementById('ritual-grid');
  if(!titleEl||!copyEl||!gridEl) return;
  const input=getCurrentInputSnapshot();
  titleEl.textContent='次に戻るタイミング';
  copyEl.textContent=`今回の鑑定を「読みっぱなし」で終わらせないために、${input.fullname||'あなた'}さん向けの戻り方を置いておきます。読み返したあとにどう動くかまで、ここで整えます。`;
  gridEl.innerHTML=getReturnRitualSteps().map(step=>`
    <div class="ritual-step">
      <div class="ritual-step-eyebrow">${escapeHtml(step.eyebrow)}</div>
      <div class="ritual-step-body">${escapeHtml(step.body)}</div>
    </div>
  `).join('');
}

function buildFollowupContext(){
  const input=getCurrentInputSnapshot();
  const lenNames=(SEL_LEN||[]).map(id=>`No.${id} ${LENORMAND[id]?.name||''}`).join(' / ');
  const orcNames=(SEL_ORC||[]).map(id=>`No.${id} ${ORACLE[id]?.name||''}`).join(' / ');
  return `【相談者】${input.fullname||'あなた'}さん
【相談テーマ】${input.cat||'総合'}「${input.theme||'全般'}」
【魂の本質診断の補足】${buildReactionPromptSnippet()}
【ルノルマン】${lenNames||'なし'}
【オラクル】${orcNames||'なし'}
【人物像の要約】
${LAST_OUTPUTS.about||'なし'}

【基礎鑑定の統合詳細】
${LAST_OUTPUTS.foundationDeep||buildFoundationDeepFallback()}

【ルノルマン鑑定】
${LAST_OUTPUTS.len||'なし'}

【オラクル鑑定】
${LAST_OUTPUTS.orc||'なし'}

【統合メッセージ】
${LAST_OUTPUTS.integration||'なし'}`;
}

function renderMemberFollowupSection(){
  const stateEl=document.getElementById('member-result-state');
  const noteEl=document.getElementById('member-locked-note');
  const actionsEl=document.getElementById('member-followup-actions');
  const outputEl=document.getElementById('member-followup-output');
  const logEl=document.getElementById('member-followup-log');
  const copyEl=document.getElementById('member-panel-copy');
  if(!stateEl||!noteEl||!actionsEl||!outputEl||!logEl||!copyEl) return;

  const followups=LAST_OUTPUTS.followups||{};
  stateEl.className='member-state '+(isMemberActive()?'active':'inactive');
  stateEl.textContent=isMemberActive()
    ?(MEMBER_AUTH.source==='developer'
      ?'追加質問を開発者権限で利用中'
      :(MEMBER_AUTH.source==='local_preview'?'追加質問を試験表示中':'追加質問を利用中'))
    :(canUsePaidTestMode()?'ローカル試験待機中':(MEMBER_AUTH.codeConfigured?'会員セッション待ち':'公開準備中'));
  copyEl.textContent=isMemberActive()
    ?'結果を読んだあとに残る「あと1つだけ聞きたいこと」を追加で見られます。相手の気持ち、この7日でやること、動く時期などを絞って深めるための欄です。'
    :(canUsePaidTestMode()
      ?'この端末ではローカル試験セッションを発行すると、現在の結果を土台に追加質問まで確認できます。'
      :((MEMBER_AUTH.googleClientConfigured&&!MEMBER_AUTH.authLoggedIn)
        ?'公開環境ではGoogleでログインし、その後にStripeの月額登録へ進むと追加質問が開きます。'
        :((MEMBER_AUTH.authLoggedIn&&MEMBER_AUTH.stripeCheckoutReady)
          ?'ログイン済みです。Stripeの月額登録が完了すると、この結果の続きから追加質問へ進めます。'
          :'会員導線が整うと、今回の結果を土台に追加質問まで進めます。')));

  if(!isMemberActive()){
    noteEl.style.display='block';
    noteEl.textContent=canUsePaidTestMode()
      ?'ローカル試験セッションを発行すると、いまの結果を土台に追加質問まで確認できます。'
      :((MEMBER_AUTH.googleClientConfigured&&!MEMBER_AUTH.authLoggedIn)
        ?'まずGoogleでログインし、その後にStripeの月額登録へ進んでください。'
        :((MEMBER_AUTH.authLoggedIn&&MEMBER_AUTH.stripeCheckoutReady)
          ?'Stripeの月額登録が完了すると、この結果の続きから追加質問へ進めます。'
          :(MEMBER_AUTH.codeConfigured
            ?'認証コードがある場合は入力して会員セッションを発行できます。'
            :'現在はまだ使えません。')));
    actionsEl.innerHTML=canUsePaidTestMode()
      ?`<button class="followup-btn" onclick="toggleMemberPreview()">ローカル試験を開始</button>`
      :((MEMBER_AUTH.googleClientConfigured&&!MEMBER_AUTH.authLoggedIn)
        ?`<button class="followup-btn" onclick="openMemberAccessModal('upgrade-paid')">Googleでログイン</button>`
        :((MEMBER_AUTH.authLoggedIn&&MEMBER_AUTH.manageBillingAvailable)
          ?`<button class="followup-btn" onclick="openStripeBillingPortal()">請求管理</button>`
          :((MEMBER_AUTH.authLoggedIn&&MEMBER_AUTH.stripeCheckoutReady)
            ?`<button class="followup-btn" onclick="openStripeCheckout('upgrade-paid')">Stripeで月額登録</button>`
            :`<button class="followup-btn" onclick="openMemberAccessModal('upgrade-paid')" ${MEMBER_AUTH.codeConfigured?'':'disabled'}>認証コードを入力</button>`)));
  }else{
    noteEl.style.display='none';
    actionsEl.innerHTML=Object.entries(FOLLOWUP_PRESETS).map(([key,preset])=>
      `<button class="followup-btn ${ACTIVE_FOLLOWUP_KEY===key?'sel':''}" onclick="runMemberFollowup('${key}')" ${FOLLOWUP_LOADING?'disabled':''}>${preset.label}</button>`
    ).join('');
  }

  const followupKeys=Object.keys(followups);
  if(ACTIVE_FOLLOWUP_KEY&&followups[ACTIVE_FOLLOWUP_KEY]){
    outputEl.classList.add('on');
    outputEl.textContent=followups[ACTIVE_FOLLOWUP_KEY];
  }else if(FOLLOWUP_LOADING){
    outputEl.classList.add('on');
    outputEl.innerHTML='<div class="ai-load"><div class="ai-dots"><span></span><span></span><span></span></div><span>追加の読みをまとめています…</span></div>';
  }else{
    outputEl.classList.remove('on');
    outputEl.textContent='';
  }

  logEl.innerHTML=followupKeys.map(key=>`
    <button class="followup-log-item" onclick="openSavedFollowup('${key}')">${FOLLOWUP_PRESETS[key]?.label||key} を開く</button>
  `).join('');
}

function openSavedFollowup(key){
  ACTIVE_FOLLOWUP_KEY=key;
  renderMemberFollowupSection();
}

async function runMemberFollowup(key){
  if(!isMemberActive()){
    showToast('あとから使える追加質問として準備中です');
    return;
  }
  if(FOLLOWUP_LOADING) return;
  const preset=FOLLOWUP_PRESETS[key];
  if(!preset) return;
  FOLLOWUP_LOADING=true;
  ACTIVE_FOLLOWUP_KEY=key;
  renderMemberFollowupSection();

  const input=getCurrentInputSnapshot();
  const systemPrompt=`あなたは、結果を読んだあとに残る追加質問へ答える占い師です。
前回の鑑定内容を繰り返すだけではなく、さらに一段深い解像度に上げてください。
以下を必ず守ってください。
- 抽象論で終わらず、現実の行動や判断に落とし込む
- 断定しすぎず、相手の気持ちは可能性として丁寧に扱う
- 前回の統合メッセージと矛盾しない
- 600〜900字程度で、見出しは1つだけにする`;
  const prompt=`${buildFollowupContext()}

【今回の追加テーマ】
${preset.label}

【追加指示】
${preset.intro}

${input.fullname||'あなた'}さんが「もう一段深く分かった」「次に何をすればいいか見えた」と感じる追加の読みを書いてください。`;

  try{
    const res=await callAI(prompt,1400,systemPrompt,{
      taskKey:'followup',
      images:buildCardImageRefs('all','followup'),
    });
    LAST_OUTPUTS.followups[key]=res;
    persistCurrentReading();
  }catch(e){
    showToast(e?.userMessage||'追加の読みの生成に失敗しました');
  }finally{
    FOLLOWUP_LOADING=false;
    renderMemberFollowupSection();
  }
}

// ── X（Twitter）シェア ─────────────────────────────────────────────────
function shareToX(){
  const name=document.getElementById('f-fullname')?.value||'';
  const cat=document.getElementById('f-cat')?.value||'総合';
  const lenNames=SEL_LEN.slice(0,3).map(id=>LENORMAND[id]?.name).filter(Boolean).join('・');
  const orcName=SEL_ORC[0]?ORACLE[SEL_ORC[0]]?.name:'';
  const planLabel=PLAN==='paid'?'12枚総合鑑定':'無料鑑定';

  const rawLines=[
    `✨ 羅針占術で${planLabel}をしました`,
    ``,
    `【ルノルマン】${lenNames}${SEL_LEN.length>3?'…':''}`,
    orcName?`【数秘オラクル】${orcName}`:'',
    `【テーマ】${cat}`,
    ``,
    `あなたも占ってみて👇`,
    location.origin+location.pathname,
    ``,
    `#羅針占術 #ルノルマン占い #今日の運勢`,
  ];
  // 空行の連続を除去・falsy行を除去
  const lines=rawLines.filter((l,i)=>l!==false&&!(l===''&&rawLines[i-1]===''));
  const text=lines.join('\n');
  window.open('https://twitter.com/intent/tweet?text='+encodeURIComponent(text),'_blank','noopener,noreferrer');
}

// ══════════════════════════════════════════════════
// READER MODE — カード参照表
// ══════════════════════════════════════════════════
function renderReaderRef(){
  // ルノルマン参照表
  const lenPos=getLenSpreadLabels();
  const lenRows=SEL_LEN.map((id,i)=>{
    const c=LENORMAND[id];
    const kws=(c.kw||'').split(',').slice(0,4).map(k=>k.trim()).join(' · ');
    return`<tr>
      <td class="card-ref-pos">${lenPos[i]||''}</td>
      <td class="card-ref-name">No.${id}「${c.name}」</td>
      <td class="card-ref-kw">${kws}</td>
    </tr>`;
  }).join('');
  const lenRef=document.getElementById('r-len-ref');
  if(lenRef){
    lenRef.style.display='block';
    lenRef.innerHTML=`
      <div class="reader-badge">🔮 占い師参照用</div>
      <table class="card-ref-table"><tbody>${lenRows}</tbody></table>
      ${SEL_LEN.length===9?`<div class="card-ref-note">行：上段=顕在意識 / 中段=現実 / 下段=潜在意識<br>列：左列=背景 / 中列=現状 / 右列=未来</div>`:''}`;
  }

  // オラクル参照表
  const orcLabels=getOrcSpreadLabels();
  const orcRows=SEL_ORC.map((id,i)=>{
    const o=ORACLE[id];
    return`<tr>
      <td class="card-ref-pos">${orcLabels[i]||''}</td>
      <td class="card-ref-name">No.${id}「${o.name}」</td>
      <td class="card-ref-kw">${(o.msg||'').slice(0,42)}…</td>
    </tr>`;
  }).join('');
  const orcRef=document.getElementById('r-orc-ref');
  if(orcRef){
    orcRef.style.display='block';
    orcRef.innerHTML=`
      <div class="reader-badge" style="margin-top:4px;">✦ 数秘参照用</div>
      <table class="card-ref-table"><tbody>${orcRows}</tbody></table>
      ${SEL_ORC.length===3?`<div class="card-ref-note">左=背景 / 中=現状 / 右=未来へのヒント</div>`:''}`;
  }
}

// ══════════════════════════════════════════════════
// TODAY'S CARD
// ══════════════════════════════════════════════════
// ══════════════════════════════════════════════════
// API KEY MANAGEMENT
// ══════════════════════════════════════════════════
function loadApiKey(){
  // 開発時のみ、直接API接続用のキーを読み込む
  let saved='';
  try{
    saved=sessionStorage.getItem('uranai-apikey')||'';
  }catch(_error){
    saved='';
  }
  API_KEY=saved||OPERATOR_API_KEY;
  // 開発者モード時のみ設定ボタン・バッジを表示
  if(DEV_MODE){
    const btn=document.getElementById('settings-btn');
    if(btn) btn.style.display='flex';
    const badge=document.getElementById('dev-badge');
    if(badge) badge.style.display='block';
  }
  updateKeyIndicator();
}

function openSettings(){
  if(!DEV_MODE) return; // 開発者モード以外では開かない
  document.getElementById('apikey-input').value=API_KEY;
  updateKeyStatus(API_KEY);
  document.getElementById('modal-cancel-btn').style.display='block';
  document.getElementById('settings-modal').classList.add('on');
}

function closeSettings(){
  document.getElementById('settings-modal').classList.remove('on');
}

function saveApiKey(){
  const val=document.getElementById('apikey-input').value.trim();
  if(!val){
    updateKeyStatus('','APIキーを入力してください');
    return;
  }
  if(!val.startsWith('sk-ant-')){
    updateKeyStatus('','「sk-ant-」から始まるキーを入力してください');
    return;
  }
  API_KEY=val;
  try{
    sessionStorage.setItem('uranai-apikey',val);
  }catch(_error){}
  updateKeyIndicator();
  closeSettings();
  showToast('APIキーを保存しました');
}

function updateKeyStatus(key,errMsg=''){
  const el=document.getElementById('key-status');
  if(errMsg){el.className='key-status ng';el.textContent='⚠ '+errMsg;return;}
  if(key&&key.startsWith('sk-ant-')){
    el.className='key-status ok';
    el.textContent='✓ キーが設定されています（'+key.slice(0,12)+'…）';
  }else{
    el.className='key-status ng';
    el.textContent='✗ キーが未設定です';
  }
}

function updateKeyIndicator(){
  const btn=document.getElementById('settings-btn');
  if(!btn) return;
  btn.classList.toggle('key-ok',!!(API_KEY&&API_KEY.startsWith('sk-ant-')));
}

// ─── API共通呼び出し────────────────────────────────────────────────────
function rememberFileProxyOrigin(origin=''){
  FILE_PROXY_ORIGIN=String(origin||'').trim().replace(/\/+$/,'');
  try{
    if(FILE_PROXY_ORIGIN){
      sessionStorage.setItem(FILE_PROXY_STORAGE_KEY,FILE_PROXY_ORIGIN);
      localStorage.setItem(FILE_PROXY_STORAGE_KEY,FILE_PROXY_ORIGIN);
    }else{
      sessionStorage.removeItem(FILE_PROXY_STORAGE_KEY);
      localStorage.removeItem(FILE_PROXY_STORAGE_KEY);
    }
  }catch(e){}
  return FILE_PROXY_ORIGIN;
}

async function resolveFileProxyOrigin(force=false){
  if(location.protocol!=='file:') return'';
  if(FILE_PROXY_ORIGIN&&!force) return FILE_PROXY_ORIGIN;
  for(const origin of FILE_PROXY_CANDIDATES){
    try{
      const res=await fetch(`${origin}/api/health`,{cache:'no-store',mode:'cors'});
      if(res.ok){
        return rememberFileProxyOrigin(origin);
      }
    }catch(e){}
  }
  if(force) rememberFileProxyOrigin('');
  return'';
}

function getApiBaseOrigin(){
  return location.protocol==='file:'?FILE_PROXY_ORIGIN:'';
}

function buildApiUrl(endpoint=''){
  const path=String(endpoint||'');
  const origin=getApiBaseOrigin();
  return origin&&path.startsWith('/')?`${origin}${path}`:path;
}

function buildApiHeaders(headers={}){
  const next={...(headers||{})};
  const developerEmail=LOCAL_TEST_RUNTIME&&MEMBER_AUTH?.developerAccess?String(MEMBER_AUTH.userEmail||'').trim().toLowerCase():'';
  if(developerEmail) next['X-Uranai-Developer-Email']=developerEmail;
  return next;
}

async function fetchApi(endpoint,options={}){
  if(location.protocol==='file:'&&!FILE_PROXY_ORIGIN){
    await resolveFileProxyOrigin();
  }
  const requestUrl=buildApiUrl(endpoint);
  const nextOptions={...options,headers:buildApiHeaders(options.headers||{})};
  if(getApiBaseOrigin()){
    if(!nextOptions.mode) nextOptions.mode='cors';
    if(!nextOptions.credentials) nextOptions.credentials='include';
  }
  return fetch(requestUrl,nextOptions);
}

function makeClientLogKey(entry={}){
  return [
    String(entry.type||''),
    String(entry.message||'').slice(0,120),
    String(entry.source||'').slice(0,120),
  ].join('|');
}

async function sendClientLog(entry={}){
  const payload={
    level:String(entry.level||'error').slice(0,16),
    type:String(entry.type||'client').slice(0,48),
    message:String(entry.message||'').slice(0,400),
    stack:String(entry.stack||'').slice(0,1200),
    href:String(entry.href||location.href||'').slice(0,300),
    source:String(entry.source||'').slice(0,120),
    meta:entry.meta&&typeof entry.meta==='object'?entry.meta:{},
  };
  if(!payload.message) return false;
  const key=makeClientLogKey(payload);
  if(SENT_CLIENT_LOG_KEYS.has(key)) return false;
  SENT_CLIENT_LOG_KEYS.add(key);
  if(SENT_CLIENT_LOG_KEYS.size>40){
    const oldest=SENT_CLIENT_LOG_KEYS.values().next().value;
    if(oldest) SENT_CLIENT_LOG_KEYS.delete(oldest);
  }
  try{
    await fetchApi(CLIENT_LOG_ENDPOINT,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload),
    });
    return true;
  }catch(e){
    return false;
  }
}

function installGlobalClientLogging(){
  if(CLIENT_LOGGING_READY) return;
  CLIENT_LOGGING_READY=true;
  window.addEventListener('error',event=>{
    const message=event?.message||event?.error?.message||'window.error';
    sendClientLog({
      type:'window.error',
      level:'error',
      message,
      stack:event?.error?.stack||'',
      source:event?.filename?`${event.filename}:${event.lineno||0}:${event.colno||0}`:'',
    });
  });
  window.addEventListener('unhandledrejection',event=>{
    const reason=event?.reason;
    const message=typeof reason==='string'?reason:(reason?.message||'unhandledrejection');
    sendClientLog({
      type:'unhandledrejection',
      level:'error',
      message,
      stack:reason?.stack||'',
      source:'',
    });
  });
}

function canUseProxy(){
  return location.protocol==='http:'||location.protocol==='https:'||!!FILE_PROXY_ORIGIN;
}

function canUseDirectApi(){
  return DEV_MODE&&!!(API_KEY&&API_KEY.startsWith('sk-ant-'));
}

function makeAppError(code,userMessage=''){
  const err=new Error(code);
  err.code=code;
  err.userMessage=userMessage;
  return err;
}

async function readJsonSafe(res){
  try{return await res.json();}catch(e){return null;}
}

function getServerHealthViewModel(){
  if(!canUseProxy()){
    return{
      cls:'warn',
      title:'ローカルファイル表示中',
      detail:'AI接続確認は http://127.0.0.1:3000 のように server.js 経由で開いたときだけ行えます。'
    };
  }
  if(!RUNTIME_HEALTH.checked){
    return{
      cls:'warn',
      title:'無料GPT / 有料Claude の接続状態を確認しています',
      detail:'server.js の接続状態を確認しています。'
    };
  }
  if(!RUNTIME_HEALTH.reachable){
    return{
      cls:'bad',
      title:'AIサーバーに接続できません',
      detail:'`start-uranai.ps1` から起動してください。無料版は `./setup-openai.ps1`、有料版は `./setup-anthropic.ps1` で `.env` を整えられます。'
    };
  }
  if(RUNTIME_HEALTH.openai&&RUNTIME_HEALTH.anthropic){
    return{
      cls:'ok',
      title:'無料GPT / 有料Claude ともに準備OK',
      detail:'無料版は GPT-5.4 mini、有料版は Claude Opus 系で呼び出せる状態です。'
    };
  }
  if(RUNTIME_HEALTH.openai&&!RUNTIME_HEALTH.anthropic){
    return{
      cls:'warn',
      title:'無料GPTのみ準備OK',
      detail:'無料版の GPT-5.4 mini は使えますが、有料版の Claude は未接続です。`.env` に `ANTHROPIC_API_KEY` を追加してください。'
    };
  }
  if(!RUNTIME_HEALTH.openai&&RUNTIME_HEALTH.anthropic){
    return{
      cls:'warn',
      title:'有料Claudeのみ準備OK',
      detail:'有料版の Claude は使えますが、無料版の GPT-5.4 mini は未接続です。`.env` に `OPENAI_API_KEY` を追加してください。'
    };
  }
  return{
    cls:'warn',
    title:'無料GPT / 有料Claude ともに未接続',
    detail:'`.\\setup-openai.ps1` と `.\\setup-anthropic.ps1` を実行するか、`.env` に両方のAPIキーを入れてから `start-uranai.ps1` で起動してください。'
  };
}

function applyRuntimeStatus(targetId,viewModel){
  const el=document.getElementById(targetId);
  if(!el||!viewModel) return;
  el.className=`runtime-status ${viewModel.cls||'warn'}`;
  el.innerHTML=`<div class="runtime-status-title">${escapeHtml(viewModel.title||'')}</div><div class="runtime-status-detail">${escapeHtml(viewModel.detail||'')}</div>`;
}

function renderRuntimeStatus(){
  const viewModel=getServerHealthViewModel();
  applyRuntimeStatus('top-ai-status',viewModel);
  applyRuntimeStatus('modal-ai-status',viewModel);
  const guideEl=document.getElementById('modal-ai-guide');
  if(guideEl){
    if(RUNTIME_HEALTH.openai&&RUNTIME_HEALTH.anthropic){
      guideEl.textContent='両方のキー設定はできています。`start-uranai.ps1` から起動すれば、無料はGPT・有料はClaudeで動きます。';
    }else if(RUNTIME_HEALTH.openai){
      guideEl.textContent='OpenAI 側は準備できています。有料版も使うなら `.\\setup-anthropic.ps1` を実行してください。';
    }else if(RUNTIME_HEALTH.anthropic){
      guideEl.textContent='Anthropic 側は準備できています。無料版も使うなら `.\\setup-openai.ps1` を実行してください。';
    }else{
      guideEl.textContent='無料版は `.\\setup-openai.ps1`、有料版は `.\\setup-anthropic.ps1` を1回ずつ実行すると `.env` を整えられます。';
    }
  }
}

async function loadServerHealth(silent=false){
  if(location.protocol==='file:'&&!FILE_PROXY_ORIGIN) await resolveFileProxyOrigin();
  if(!silent){
    RUNTIME_HEALTH={
      checked:false,
      reachable:false,
      openai:false,
      anthropic:false,
      google:false,
      paidTestMode:false,
      memberCodeConfigured:false,
      stripeCheckoutReady:false,
      stripePortalReady:false,
      error:'',
      mode:'',
    };
    renderRuntimeStatus();
  }
  if(!canUseProxy()){
    RUNTIME_HEALTH={
      checked:true,
      reachable:false,
      openai:false,
      anthropic:false,
      google:false,
      paidTestMode:LOCAL_TEST_RUNTIME,
      memberCodeConfigured:false,
      stripeCheckoutReady:false,
      stripePortalReady:false,
      error:'LOCAL_FILE',
      mode:'',
    };
    renderRuntimeStatus();
    await loadMemberStatus({silent:true,render:true});
    return;
  }
  try{
      const res=await fetchApi('/api/health',{cache:'no-store'});
    const data=await readJsonSafe(res);
    RUNTIME_HEALTH={
      checked:true,
      reachable:!!data?.ok,
      openai:!!data?.openaiKeyConfigured,
      anthropic:!!data?.anthropicKeyConfigured,
      google:!!data?.googleClientConfigured,
      paidTestMode:!!data?.paidTestMode,
      memberCodeConfigured:!!data?.memberCodeConfigured,
      stripeCheckoutReady:!!data?.stripeCheckoutReady,
      stripePortalReady:!!data?.stripePortalReady,
      error:'',
      mode:data?.mode||'',
    };
  }catch(e){
    RUNTIME_HEALTH={
      checked:true,
      reachable:false,
      openai:false,
      anthropic:false,
      google:false,
      paidTestMode:LOCAL_TEST_RUNTIME,
      memberCodeConfigured:false,
      stripeCheckoutReady:false,
      stripePortalReady:false,
      error:'FETCH_FAILED',
      mode:'',
    };
  }
  renderRuntimeStatus();
  await loadMemberStatus({silent:true,render:true});
}

function getTaskModelConfig(taskKey=''){
  if(taskKey&&AI_MODEL_CONFIG[taskKey]) return AI_MODEL_CONFIG[taskKey];
  return PLAN==='paid'?AI_MODEL_CONFIG.paid:AI_MODEL_CONFIG.free;
}

function buildAiPayload(userPrompt,maxTokens,sys,options={}){
  const taskCfg=getTaskModelConfig(options.taskKey||'');
  return{
    provider:options.provider||taskCfg.provider,
    model:options.model||taskCfg.model,
    task_key:options.taskKey||'',
    plan:PLAN,
    max_tokens:maxTokens,
    system:sys,
    messages:[{role:'user',content:userPrompt}],
    reasoning_effort:options.reasoningEffort||taskCfg.reasoningEffort||'',
    fallbackProvider:options.fallbackProvider||taskCfg.fallbackProvider||'',
    fallbackModel:options.fallbackModel||taskCfg.fallbackModel||'',
    images:Array.isArray(options.images)?options.images:[],
  };
}

async function callAIThroughProxy(payload){
  const res=await fetchApi(API_PROXY_ENDPOINT,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload)
  });
  const data=await readJsonSafe(res);
  if(res.ok) return data?.content?.[0]?.text||'';
  if(data?.error==='ANTHROPIC_API_KEY_MISSING'||data?.error==='OPENAI_API_KEY_MISSING'){
    throw makeAppError(data?.error,'サーバー側のAPIキーが未設定です。');
  }
  if(data?.error==='ANTHROPIC_UPSTREAM_ERROR'){
    throw makeAppError('ANTHROPIC_UPSTREAM_ERROR',data?.message||'AIサーバーでエラーが発生しました。');
  }
  if(data?.error==='OPENAI_UPSTREAM_ERROR'){
    throw makeAppError('OPENAI_UPSTREAM_ERROR',data?.message||'AIサーバーでエラーが発生しました。');
  }
  if(data?.error==='ANTHROPIC_NETWORK_ERROR'){
    throw makeAppError('ANTHROPIC_NETWORK_ERROR','AIサーバーに接続できませんでした。');
  }
  if(data?.error==='PAID_AUTH_REQUIRED'||data?.error==='PAID_SESSION_REQUIRED'){
    openMemberAccessModal('upgrade-paid');
    throw makeAppError(data?.error,getServerErrorMessage(data,'有料版の会員確認が必要です。'));
  }
  if(data?.provider==='openai'){
    throw makeAppError(data?.error||'OPENAI_PROXY_FAILED',data?.message||'OpenAI側でエラーが発生しました。');
  }
  throw makeAppError('PROXY_REQUEST_FAILED',data?.message||`AIサーバーでエラーが発生しました（${res.status}）。`);
}

async function callAIDirect(payload){
  if(!API_KEY){
    if(DEV_MODE) openSettings();
    showToast('開発者モードのAPIキーが未設定です。');
    throw makeAppError('API_KEY_MISSING','開発者モードのAPIキーが未設定です。');
  }
  const res=await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'x-api-key':API_KEY,
      'anthropic-version':'2023-06-01',
      'anthropic-dangerous-direct-browser-access':'true'
    },
    body:JSON.stringify({
      model:payload.model,
      max_tokens:payload.max_tokens,
      system:payload.system,
      messages:payload.messages
    })
  });
  if(res.status===401||res.status===403){
    showToast('開発者モードのAPIキーが無効です。');
    openSettings();
    throw makeAppError('API_AUTH_ERROR','開発者モードのAPIキーが無効です。');
  }
  if(!res.ok){
    throw makeAppError('DIRECT_API_ERROR',`Anthropic APIエラー（${res.status}）`);
  }
  const data=await res.json();
  return data.content?.[0]?.text||'';
}

async function callAI(userPrompt,maxTokens=500,sys='',options={}){
  // 占い師モード かつ 開発者モードでない → AIスキップ
  if(PLAN==='reader' && !DEV_MODE) throw new Error('FREE_MODE_NO_AI');
  if(location.protocol==='file:'&&!FILE_PROXY_ORIGIN) await resolveFileProxyOrigin();
  const system=sys||'あなたは、占いを内省と行動支援に使うプロの鑑定者です。温かみがありつつ現実的な日本語で答えてください。超常的・神秘的な表現や運命論は使わず、ラベルや見出しもつけないこと。';
  const payload=buildAiPayload(userPrompt,maxTokens,system,options);

  if(canUseProxy()){
    try{
      return await callAIThroughProxy(payload);
    }catch(error){
      const canFallbackViaDevDirect=canUseDirectApi()&&payload.provider==='anthropic';
      if(canFallbackViaDevDirect){
        showToast('AIサーバーに接続できないため、開発者モードの直接接続に切り替えます。');
        return await callAIDirect(payload);
      }
      if(payload.fallbackProvider&&payload.fallbackModel){
      const fallbackPayload={
          ...payload,
          provider:payload.fallbackProvider,
          model:payload.fallbackModel,
          reasoning_effort:'',
          fallbackProvider:'',
          fallbackModel:'',
          images:[],
        };
        showToast('主力モデルが使えないため、代替モデルで鑑定を続行します。');
        return await callAIThroughProxy(fallbackPayload);
      }
      showToast(error?.userMessage||'AIサーバーに接続できませんでした。');
      throw error;
    }
  }

  if(canUseDirectApi()&&payload.provider==='anthropic') return await callAIDirect(payload);

  if(DEV_MODE) openSettings();
  showToast('AI鑑定を使うには server.js から起動するか、?dev でAPIキーを設定してください。');
  throw makeAppError('AI_RUNTIME_UNAVAILABLE','AI鑑定の実行環境が未設定です。');
}



// ─── リッチフォールバック（APIなし時の高品質リーディング）──────────────────
function buildRichLenFallback(name,cat){
  const input=getCurrentInputSnapshot();
  const focus=analyzeConsultationFocus(cat,input.theme||'');
  const ids=[...SEL_LEN];
  const is9=(SEL_LEN.length===9);
  const is3=(SEL_LEN.length===FREE_LEN_COUNT);
  const coreId=is9?SEL_LEN[4]:(is3?SEL_LEN[1]:SEL_LEN[0]);
  const currentId=is9?SEL_LEN[1]:(is3?SEL_LEN[1]:coreId);
  const futureId=is9?(SEL_LEN[5]||SEL_LEN[2]):(is3?(SEL_LEN[2]||coreId):coreId);
  const backgroundIds=is9?[SEL_LEN[0],SEL_LEN[3],SEL_LEN[6]].filter(Boolean):(is3?[SEL_LEN[0]].filter(Boolean):ids);
  const currentIds=is9?[SEL_LEN[1],SEL_LEN[4],SEL_LEN[7]].filter(Boolean):(is3?[SEL_LEN[1]].filter(Boolean):ids);
  const futureIds=is9?[SEL_LEN[2],SEL_LEN[5],SEL_LEN[8]].filter(Boolean):(is3?[SEL_LEN[2]].filter(Boolean):ids);
  const visibleIds=is9?[SEL_LEN[0],SEL_LEN[1],SEL_LEN[2]].filter(Boolean):ids;
  const hiddenIds=is9?[SEL_LEN[6],SEL_LEN[7],SEL_LEN[8]].filter(Boolean):[];
  const hasHidden=hasLenGroup(ids,'hidden');
  const hasEnding=hasLenGroup(ids,'ending');
  const hasStability=hasLenGroup(ids,'stability');
  const hasValue=hasLenGroup(ids,'value');
  const hasRelationship=hasLenGroup(ids,'relationship');
  const hasBurden=hasLenGroup(ids,'burden');
  const hasSupport=hasLenGroup(ids,'support');
  const hasChoice=hasLenGroup(ids,'choice');
  const hasPredatorPair=hasLenAdjacentCardPair(7,23,SEL_LEN.length)||hasLenAdjacentCardPair(14,23,SEL_LEN.length);
  const backgroundBurden=hasLenGroup(backgroundIds,'burden');
  const backgroundStability=hasLenGroup(backgroundIds,'stability');
  const currentChoice=hasLenGroup(currentIds,'choice');
  const currentHidden=hasLenGroup(currentIds,'hidden');
  const futureEnding=hasLenGroup(futureIds,'ending');
  const futureSupport=hasLenGroup(futureIds,'support');
  const directPressure=is9&&hasLenGroup([SEL_LEN[1],SEL_LEN[3],SEL_LEN[5],SEL_LEN[7]].filter(Boolean),'burden');
  const visibleChoice=hasLenGroup(visibleIds,'choice');
  const hiddenBurden=hasLenGroup(hiddenIds,'burden');
  const hiddenRelationship=hasLenGroup(hiddenIds,'relationship');
  const actionPlan=buildThemeSpecificActionPlan(focus);
  const lines=[];
  lines.push('■ 今の流れ','');
  lines.push(getLenCoreFocusText(coreId));
  if(focus.isDualConcern){
    lines.push(`${name}さんはいま、恋愛と仕事の両方で「失いたくない気持ち」が強く、判断を先送りしやすい状態です。`);
    lines.push('まず必要なのは、恋愛と仕事を同じ重さで抱え込まないことです。どちらも一気に結論を出すのではなく、続ける条件と切り替える条件を別々に言葉にした方が答えが見えます。');
  }else if(focus.hasLove){
    lines.push(`${name}さんに今必要なのは、情があるかどうかだけで判断せず、この関係が安心を増やすのか不安を増やすのかを見極めることです。`);
  }else if(focus.hasWork){
    lines.push(`${name}さんに今必要なのは、今の場所に残ること自体ではなく、このまま続けた先に納得できる成長があるかを見直すことです。`);
  }else{
    lines.push(`${name}さんに今必要なのは、気持ちを整えることより先に、何が判断を止めているのかを一段ずつ分けることです。`);
  }
  if((is9||is3)&&backgroundBurden){
    lines.push('背景には、長く抱えてきた負担や止まりやすさが残っています。いまの迷いは突然始まったものではなく、前から続いている引っかかりが現在列まで持ち込まれています。');
  }else if((is9||is3)&&backgroundStability){
    lines.push('背景には、安定を守るために踏ん張ってきた流れがあります。その積み重ねがあるぶん、今は変える判断に慎重になりやすい時期です。');
  }
  if(hasHidden||[6,26,32].includes(currentId)||currentHidden){
    lines.push('いまは、まだ言えていない本音や見落としている条件が残っています。そこを曖昧なままにした現状維持はおすすめできません。');
  }
  if((is9||is3)&&currentChoice){
    lines.push('現状の列では、整理したいことや選びたいことがはっきりしています。ただ、選択肢が見えていることと、納得して選べることは別なので、今は比べる軸を先に整える必要があります。');
  }
  if(directPressure){
    lines.push('中心のすぐ近くに負担の強いカードが寄っているので、問題は遠くではなく、すでに生活や判断の真ん中まで入り込んでいます。');
  }
  if(futureEnding||[8,10,17,36].includes(futureId)){
    lines.push('右側の流れには、今のまま先送りすると自分で選ぶ前に区切りが入りやすい気配があります。');
  }
  if(futureSupport||hasSupport){
    lines.push('ただし、確認ポイントを先に言語化できれば、続ける道も切り替える道も自分で選び直せます。');
  }

  lines.push('','■ 気をつけること','');
  if(hasStability){
    lines.push('これまでは、安定や安心を守るためによく踏ん張ってきたはずです。だからこそ、いまは「変えること」そのものが怖くなりやすく、多少の違和感があっても持ちこたえる方向へ気持ちが寄りやすくなっています。');
  }else{
    lines.push('いま動きにくいのは、気持ちが弱いからではありません。判断材料が散らばったまま頭の中で混ざっていて、何から考えればいいか分からなくなっているからです。');
  }
  if(is9&&visibleChoice&&hiddenBurden){
    lines.push('表では「整理すれば決められる」と思っていても、深いところでは負担や怖さがまだ強く残っています。このズレを無視すると、頭では決めたつもりでも行動が止まりやすくなります。');
  }else if(is9&&hiddenRelationship){
    lines.push('表に出している理由とは別に、下の段には情やつながりへの未練が残りやすい流れがあります。条件だけで割り切れない前提を認めたほうが、かえって判断は整います。');
  }else if(is3&&backgroundIds.length&&futureIds.length){
    lines.push('今回の3枚では、背景から今に続いている流れと、このまま進んだ場合の近い変化が比較的素直に出ています。気分で決めるより、今週の確認ポイントを先に決めたほうが答えはぶれません。');
  }
  if(hasValue){
    lines.push('今回の悩みは、好き嫌いだけではなく、負担・見返り・生活との釣り合いが強く絡んでいます。だから「我慢できるか」ではなく、「続ける意味があるか」で見直す必要があります。');
  }
  if(hasBurden){
    lines.push('疲れや遠慮も積み重なっていて、考えるほど重くなりやすい流れです。勢いで決めるより、負担を数えることが大事です。');
  }
  if(hasPredatorPair){
    lines.push('今回の並びには、消耗や損失がそのまま減るだけで終わらず、やり方次第で逆手に取れる組み合わせもあります。しんどさを隠すより、何を食い止められるかに発想を切り替えたほうが強いです。');
  }
  if(hasChoice){
    lines.push('選択肢は本当は一つではありません。ただ、比較の軸が曖昧なままだと、どれを選んでも不安が残ります。');
  }

  if(focus.isDualConcern){
    lines.push('恋愛と仕事を同じ焦りで処理しないことも大切です。恋愛では安心できるか、仕事では続けた先に意味が残るかと、分けて見たほうが答えがぶれません。');
  }

  lines.push('','■ 次にやること','');
  if(focus.isDualConcern){
    lines.push('恋愛と仕事を同じメモに書かず、判断基準を別紙で分けてください。');
  }else if(hasRelationship){
    lines.push('気持ちが残っていることと、続ける価値があることを分けて考えてください。');
  }
  actionPlan.forEach((item,index)=>lines.push(`${index+1}. ${item}`));
  return lines.join('\n');
}

function buildRichOrcFallback(name,cat,is3){
  const input=getCurrentInputSnapshot();
  const focus=analyzeConsultationFocus(cat,input.theme||'');
  const lpCard=LP?ORACLE[LP]:null;
  const birthPlain=buildBirthPlainInsight(MEIMEI);
  const namePlain=buildNamePlainInsight(NAMEJUDGE);
  const reaction=REACTION_PROFILE;
  const messages=SEL_ORC.map(id=>ORACLE[id]?.msg||'').filter(Boolean);
  const summarizeOracleHint=(msg,mode='present')=>{
    const text=String(msg||'').trim();
    if(!text) return '';
    if(/未来|ビジョン|理想/.test(text)){
      if(mode==='reflective') return 'ここまでのあなたは、答えが出ないときほど先の可能性を思い描いて踏ん張ってきたはずです。';
      if(mode==='present') return '今は「本当はどうなりたいか」を曖昧にしないことが大切です。';
      return '理想の形を具体的にすると、現実の動き方が決まりやすくなります。';
    }
    if(/バランス|調整|全体/.test(text)){
      if(mode==='reflective') return 'これまでのあなたは、その場を荒立てず全体が回るように気を配ってきたはずです。';
      if(mode==='present') return '今は白黒を急ぐより、ぶつかっている条件を並べ直すことが大切です。';
      return '対立を減らし、無理のない形に整えるほど状況は静かに好転します。';
    }
    if(/基盤|土台|積み重ね|努力/.test(text)){
      if(mode==='reflective') return 'あなたは派手さより、着実さで物事を支えてきた人です。';
      if(mode==='present') return '今は一発逆転より、続けられる形を整えることが大切です。';
      return '足場を固める動きのほうが、結果的に近道になります。';
    }
    if(/仲間|協力|支え|信頼/.test(text)){
      if(mode==='reflective') return '一人で抱え込むより、信頼できる相手と力を合わせることで前に進んできたはずです。';
      if(mode==='present') return '今は一人で結論を抱え込まず、信頼できる相手や情報を増やすことが大切です。';
      return '支えを受け取れるようになるほど、動きやすさが戻ってきます。';
    }
    if(/変化|更新|生まれ変わ/.test(text)){
      if(mode==='reflective') return 'これまでのあなたは、節目ごとに自分を更新しながらここまで来ています。';
      if(mode==='present') return '今は古いやり方のまま頑張るより、やり方そのものを見直すことが大切です。';
      return '変化を怖がりすぎず、小さく更新していくほど流れは軽くなります。';
    }
    if(/流れ|乗りこな/.test(text)){
      if(mode==='reflective') return 'これまでのあなたは、状況を壊さずうまく合わせながら持ちこたえてきたはずです。';
      if(mode==='present') return '今は流されるままではなく、自分がどこまで合わせるかを決めることが大切です。';
      return '無理に全部を動かすより、流れの中で選ぶ場所を決めるほうが進みやすくなります。';
    }
    if(/純粋|楽しさ|無邪気/.test(text)){
      if(mode==='reflective') return 'あなたは本来、しんどい中でも気持ちの軽さを失いきらない人です。';
      if(mode==='present') return '今は正しさより、何をしているときに気持ちが軽くなるかを無視しないことが大切です。';
      return '気持ちが軽くなる方向を選ぶほど、次の判断も整いやすくなります。';
    }
    if(mode==='reflective') return 'ここまでのあなたは、自分なりのやり方で何とか持ちこたえてきたはずです。';
    if(mode==='present') return '今はいちばん疲れている部分を後回しにしないことが大切です。';
    return '少し先の景色を具体的にすると、次の動きは決めやすくなります。';
  };
  const reflective=messages[0]?summarizeOracleHint(messages[0],'reflective'):null;
  const currentNeed=messages[1]?summarizeOracleHint(messages[1],'present'):messages[0]?summarizeOracleHint(messages[0],'present'):null;
  const futureNeed=messages[2]?summarizeOracleHint(messages[2],'future'):messages[messages.length-1]?summarizeOracleHint(messages[messages.length-1],'future'):null;
  const actionPlan=buildThemeSpecificActionPlan(focus);
  const lines=[];
  lines.push('■ 今の気持ち','');
  if(reflective){
    lines.push(`ここまでの${name}さんは、${reflective}`);
  }else{
    lines.push(`${name}さんはここまで、状況に合わせながら何とか崩れずにやってこようとしてきたはずです。`);
  }
  if(currentNeed){
    lines.push(`ただ今は、${currentNeed}`);
  }
  if(LP&&lpCard){
    lines.push(`もともとの持ち味として、${lpCard.msg.replace(/してください。?$/,'できる人です。')} その良さを、いまは他人のためだけでなく自分の判断にも使う段階です。`);
  }

  lines.push('','■ 魂の本質','');
  if(namePlain){
    lines.push(namePlain.overview);
  }
  if(birthPlain){
    lines.push(birthPlain.overview);
  }
  if(reaction?.power){
    lines.push(`反応の出方では、${reaction.power} 形で力を出しやすい人です。`);
  }else if(reaction?.summary){
    lines.push(reaction.summary);
  }
  if(reaction?.handling){
    lines.push(`抱え方の癖としては、${reaction.handling}`);
  }
  if(!reaction){
    lines.push('魂の本質診断を入力すると、あなたのストレスが出やすい場面・力を出しやすい動き方・整いやすい条件まで、この「魂の本質」欄に詳しく反映できます。入力画面の「魂の本質診断」からお試しください。');
  }

  lines.push('','■ 次にとる行動','');
  if(focus.isDualConcern){
    lines.push('恋愛と仕事を同じ不安で抱えないことが最優先です。恋愛では「安心できるか」、仕事では「続ける意味があるか」と、問いを分けるだけで頭の混乱がかなり減ります。');
  }else if(focus.hasLove){
    lines.push('相手の気持ちを読むことより先に、自分がこの関係で何を我慢しすぎているのかを認めることが先です。');
  }else if(focus.hasWork){
    lines.push('今の環境に合わせ続けることより、自分がどんな条件なら力を出しやすいかをはっきりさせることが先です。');
  }else{
    lines.push('いま必要なのは、正しい答えを一気に出すことではなく、自分が何に引っかかっているのかをはっきりさせることです。');
  }
  if(futureNeed){
    lines.push(`そのうえで、${futureNeed}`);
  }
  lines.push('迷いが強い日は、頭の中で結論を出そうとしないでください。まず「感情」「現実の条件」「相手や職場に確認すべきこと」の3つに分けるだけで、混乱はかなりほどけます。');
  lines.push('しんどい日の判断は、その日の気分より、書き出した内容を翌日に見直したときにまだ納得できるかで見てください。');
  if(!futureNeed){
    lines.push('大きく変えようとするより、無理なく続けられる小さな動きから未来を寄せていくほうが、いまは現実に合っています。');
  }
  actionPlan.slice(0,3).forEach((item,index)=>lines.push(`${index+1}. ${item}`));
  return lines.join('\n');
}

function buildIntegratedFallback(name,cat,theme=''){
  const focus=analyzeConsultationFocus(cat,theme);
  const ids=[...SEL_LEN];
  const hasHidden=hasLenGroup(ids,'hidden');
  const hasEnding=hasLenGroup(ids,'ending');
  const hasValue=hasLenGroup(ids,'value');
  const hasSupport=hasLenGroup(ids,'support');
  const actionPlan=buildThemeSpecificActionPlan(focus);
  const lines=['■ 結論',''];

  if(focus.isDualConcern){
    lines.push(`${name}さんの答えは、「恋愛と仕事を同時に片づけようとしないこと」です。いまは両方を一気に決めるより、恋愛では安心感、仕事では納得感という別々の軸で見直したほうが前に進めます。`);
  }else if(focus.hasLove){
    lines.push(`${name}さんの答えは、「情の強さ」ではなく「向き合える関係か」で見極めることです。`);
  }else if(focus.hasWork){
    lines.push(`${name}さんの答えは、「辞めたい気分」ではなく「続けた先に意味が残るか」で判断することです。`);
  }else{
    lines.push(`${name}さんの答えは、気持ちを落ち着かせることより先に、判断を止めている条件を見える形にすることです。`);
  }
  if(hasHidden) lines.push('まだ見えていない本音や条件があるので、今週は結論を急ぐより確認を増やすほうが有効です。');
  if(hasEnding) lines.push('ただし、先送りを続けるほど、自分で選ぶ前に流れが決まりやすくなります。');
  if(hasSupport) lines.push('確認ポイントを先に言葉にできれば、流れは立て直せます。');

  lines.push('','■ 判断ポイント','');
  if(focus.isDualConcern){
    lines.push(`進めてよい目印：恋愛では、不安を伝えたときに相手が向き合うこと。仕事では、半年後の自分に経験・収入・働きやすさのどれかが残ること。`);
    lines.push(`見直す目印：どちらも曖昧な返答のまま負担だけが増えること。${hasValue?'損得や負担の釣り合いも、今回は見逃さないでください。':''}`);
  }else if(focus.hasLove){
    lines.push('進めてよい目印：話し合いが進み、大事なことに相手が向き合うこと。');
    lines.push('見直す目印：大事なことを曖昧にされたまま、待つ側にだけ負担が増えること。');
  }else if(focus.hasWork){
    lines.push('進めてよい目印：改善の見込みがあり、この先に残るものが見えていること。');
    lines.push('見直す目印：条件が変わらないまま消耗だけが増えていること。');
  }else{
    lines.push('進めてよい目印：確認したいことを確認したあとでも納得が残ること。');
    lines.push('見直す目印：情報が足りないまま、勢いや不安だけで決めようとしていること。');
  }

  lines.push('','■ 次にやること','');
  actionPlan.slice(0,3).forEach((item,index)=>lines.push(`${index+1}. ${item}`));
  return lines.join('\n');
}

function getBasicFallback(){
  const birthPlain=buildBirthPlainInsight(MEIMEI);
  const namePlain=buildNamePlainInsight(NAMEJUDGE);
  const reactionLead=REACTION_PROFILE?.summary||'';
  return{
    personality:[birthPlain?.overview,namePlain?.overview,reactionLead].filter(Boolean).join(' ')||'あなたは状況の表面だけでなく、流れの癖まで感じ取れる方です。',
    timing:[birthPlain?.timing,namePlain?.timing].filter(Boolean).join(' '),
    strengths:[birthPlain?.advice,namePlain?.advice,REACTION_PROFILE?.handling].filter(Boolean).join(' '),
  };
}

function typeText(id,text,delay=0){
  const el=document.getElementById(id);
  if(!el) return;
  const normalized=String(text||'')
    .replace(/\r\n?/g,'\n')
    .replace(/\n{3,}/g,'\n\n')
    .replace(/([^\n])\n(■)/g,'$1\n\n$2')
    .trim();
  el.innerHTML='';
  setTimeout(()=>{
    if(normalized.length>1800){
      el.textContent=normalized;
      return;
    }
    let i=0;
    const cur=document.createElement('span');
    cur.className='cursor2';
    el.appendChild(cur);
    const speed=normalized.length>900?4:(normalized.length>400?7:12);
    const iv=setInterval(()=>{
      if(i>=normalized.length){clearInterval(iv);cur.remove();return;}
      cur.insertAdjacentText('beforebegin',normalized[i++]);
    },speed);
  },delay);
}

// ══════════════════════════════════════════════════
// UTILS
// ══════════════════════════════════════════════════
function makeResultCard(id,type,w,h,delay=0){
  const data=type==='len'?LENORMAND[id]:ORACLE[id];
  const imgSrc=type==='len'?`images/lenormand/${String(id).padStart(2,'0')}.png`:`images/oracle/${String(id).padStart(2,'0')}.png`;
  const el=document.createElement('div');
  el.className='result-card';
  el.style.cssText=`width:${w};height:${h};animation-delay:${delay}s;`;
  el.innerHTML=`
    <img src="${imgSrc}" class="result-card-img" onerror="this.style.display='none'" alt="">
    <div class="result-card-placeholder">
      <div class="rc-num">${id}</div>
      <div class="rc-name">${data.name}</div>
      <div class="rc-kw">${(data.kw||data.msg||'').slice(0,18)}</div>
    </div>`;
  el.onclick=()=>showToast(`No.${id} ${data.name}：${data.kw||data.msg||''}`);
  return el;
}

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  return arr;
}
let toastTm;
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('on');
  clearTimeout(toastTm);
  toastTm=setTimeout(()=>t.classList.remove('on'),2400);
}

if(typeof window!=='undefined'){
  window.startFlow=startFlow;
  window.openMemberAccessModal=openMemberAccessModal;
  window.openStripeCheckout=openStripeCheckout;
  window.openLatestHistory=openLatestHistory;
}

