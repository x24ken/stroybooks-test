import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "./index";
import { toast } from "sonner";
import {
  Trash2,
  Undo2,
  Archive as ArchiveIcon,
  Star,
  Download,
  Share2,
} from "lucide-react";

const meta = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="container flex flex-col items-center justify-center gap-8 py-10">
        <div className="flex flex-col gap-4 w-full max-w-md">
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
    onClick={onClick}
  >
    {children}
  </button>
);

export const DeleteAction: Story = {
  render: () => (
    <>
      <ToastButton
        onClick={() => {
          toast("アイテムを削除しました", {
            description: "このアクションは取り消すことができます。",
            action: {
              label: "元に戻す",
              onClick: () => toast.success("アイテムを復元しました"),
            },
            icon: <Trash2 className="h-4 w-4" />,
          });
        }}
      >
        削除アクション
      </ToastButton>
      <Toaster position="top-center" closeButton />
    </>
  ),
};

export const MultipleActions: Story = {
  render: () => (
    <>
      <ToastButton
        onClick={() => {
          toast("新しいファイルが追加されました", {
            description: "project-final-v2.pdf (2.4MB)",
            action: {
              label: "ダウンロード",
              onClick: () => console.log("Download clicked"),
            },
            cancel: {
              label: "後で",
              onClick: () => console.log("Cancel clicked"),
            },
            icon: <Download className="h-4 w-4" />,
          });
        }}
      >
        複数アクション
      </ToastButton>
      <Toaster position="top-center" closeButton />
    </>
  ),
};

export const Favorite: Story = {
  render: () => (
    <>
      <ToastButton
        onClick={() => {
          toast.success("お気に入りに追加しました", {
            description: "マイリストで確認できます。",
            action: {
              label: "表示",
              onClick: () => console.log("View clicked"),
            },
            icon: <Star className="h-4 w-4" />,
          });
        }}
      >
        お気に入り追加
      </ToastButton>
      <Toaster position="top-center" closeButton />
    </>
  ),
};

export const ArchiveStory: Story = {
  render: () => (
    <>
      <ToastButton
        onClick={() => {
          toast("アイテムをアーカイブしました", {
            description: "30日後に完全に削除されます。",
            action: {
              label: "アーカイブ解除",
              onClick: () => {
                toast.success("アーカイブを解除しました");
              },
            },
            cancel: {
              label: "キャンセル",
              onClick: () => console.log("Cancel clicked"),
            },
            icon: <ArchiveIcon className="h-4 w-4" />,
            duration: 5000,
          });
        }}
      >
        アーカイブ
      </ToastButton>
      <Toaster position="top-center" closeButton />
    </>
  ),
};

export const Share: Story = {
  render: () => (
    <>
      <ToastButton
        onClick={() => {
          toast("リンクをコピーしました", {
            description: "クリップボードにコピーされました。",
            action: {
              label: "共有",
              onClick: () => {
                toast("共有オプション", {
                  description: "共有方法を選択してください。",
                  action: {
                    label: "メール",
                    onClick: () => console.log("Email clicked"),
                  },
                  cancel: {
                    label: "キャンセル",
                    onClick: () => console.log("Cancel clicked"),
                  },
                });
              },
            },
            icon: <Share2 className="h-4 w-4" />,
          });
        }}
      >
        共有
      </ToastButton>
      <Toaster position="top-center" closeButton />
    </>
  ),
};

export const ChainedAction: Story = {
  render: () => (
    <>
      <ToastButton
        onClick={() => {
          toast("3件のアイテムを削除しました", {
            description: "選択したアイテムをゴミ箱に移動しました。",
            action: {
              label: "元に戻す",
              onClick: () => {
                toast.promise(
                  new Promise((resolve) => setTimeout(resolve, 1000)),
                  {
                    loading: "復元中...",
                    success: "アイテムを復元しました",
                    error: "復元に失敗しました",
                  }
                );
              },
            },
            icon: <Undo2 className="h-4 w-4" />,
            duration: 5000,
          });
        }}
      >
        連鎖アクション
      </ToastButton>
      <Toaster position="top-center" closeButton />
    </>
  ),
};

export const PromiseSuccess: Story = {
  render: () => (
    <>
      <ToastButton
        onClick={() => {
          toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
            loading: "データを保存中...",
            success: "保存が完了しました",
            error: "保存に失敗しました",
          });
        }}
      >
        Promise成功
      </ToastButton>
      <Toaster position="top-center" closeButton />
    </>
  ),
};

export const PromiseError: Story = {
  render: () => (
    <>
      <ToastButton
        onClick={() => {
          toast.promise(
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("エラーが発生しました")), 2000)
            ),
            {
              loading: "データを読み込み中...",
              success: "読み込みが完了しました",
              error: "読み込みに失敗しました",
            }
          );
        }}
      >
        Promiseエラー
      </ToastButton>
      <Toaster position="top-center" closeButton />
    </>
  ),
};

export const PromiseWithRetry: Story = {
  render: () => (
    <>
      <ToastButton
        onClick={() => {
          let attempts = 0;
          const makeRequest = () =>
            new Promise((resolve, reject) => {
              attempts++;
              if (attempts < 2) {
                setTimeout(() => reject(new Error("リトライが必要です")), 1500);
              } else {
                setTimeout(resolve, 1500);
              }
            });

          const showToast = () => {
            toast.promise(makeRequest(), {
              loading: "API呼び出し中...",
              success: "APIリクエストが完了しました",
              error: (err) => ({
                message: "エラーが発生しました",
                description: err.message,
                action: {
                  label: "リトライ",
                  onClick: () => showToast(),
                },
              }),
            });
          };

          showToast();
        }}
      >
        Promiseリトライ
      </ToastButton>
      <Toaster position="top-center" closeButton />
    </>
  ),
};
