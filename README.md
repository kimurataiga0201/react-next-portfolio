# Read me

# react-next-portfolio

サイトURL: https://react-next-portfolio-drab.vercel.app/

Next.js 14 と microCMS を使用したポートフォリオサイトです。ブログ機能、趣味紹介、お問い合わせフォームを備えています。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **CMS**: microCMS
- **アニメーション**: Framer Motion
- **アイコン**: Lucide React
- **デプロイ**: Vercel

## 主な機能

- ブログ記事の一覧・詳細表示
- カテゴリー別記事フィルタリング
- ブログ記事の検索機能
- ページネーション
- レスポンシブデザイン
- ハンバーガーメニュー

# 課題の紹介

## TOP

- エントリーポイントとして2つの選択肢を提供
- Framer Motionを使用したスムーズなアニメーション
- シンプルで洗練されたダークテーマデザイン

## ポートフォリオページ

- スキル・活動・プロジェクトを統合表示
- カード形式での見やすいレイアウト
- ハンバーガーメニューからアクセス可能

## ブログ一覧ページ

- microCMSから記事を取得して表示
- 検索フィールドでキーワード検索
- カテゴリー別フィルタリング機能
- 10件ごとのページネーション

## ブログ詳細ページ

- 記事の本文をHTMLとして表示
- サムネイル画像の表示
- カテゴリーと公開日の表示
- 一覧ページへの戻るリンク

# 一番見てほしいところ

- **スライドインメニュー**: 左上のハンバーガーメニューから開くスムーズなナビゲーション
- **ブログシステム**: microCMSと連携した柔軟なコンテンツ管理
- **レスポンシブ対応**: モバイルからデスクトップまで最適な表示

# 力を入れた点

## 実装面

- App Routerを使用したモダンなNext.js構成
- microCMS SDKを活用した型安全なAPI連携
- コンポーネントの再利用性を考慮した設計
- Server Componentsによる効率的なデータフェッチ

## デザイン面

- 統一感のあるダークテーマ
- Tailwind CSSによる保守性の高いスタイリング
- Framer Motionを使ったインタラクティブなアニメーション
- 直感的なナビゲーション構造

## セットアップ

```bash
# 依存関係のインストール
npm install

# 環境変数の設定
# .env.local ファイルを作成し、以下を設定
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# 本番環境での起動
npm start
```

## microCMS設定

### 必要なAPI

1. **blog** (リスト形式)
   - title: テキストフィールド
   - description: テキストフィールド
   - content: リッチエディタ
   - thumbnail: 画像
   - category: コンテンツ参照（categories）

2. **categories** (リスト形式)
   - name: テキストフィールド

3. **hobbies** (リスト形式)
   - title: テキストフィールド
   - description: テキストフィールド
   - content: リッチエディタ
   - thumbnail: 画像
   - order: 数値

詳細な設定方法は後述のセクションを参照してください。
