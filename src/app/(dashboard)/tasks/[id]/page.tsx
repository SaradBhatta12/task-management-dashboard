import { TaskDetailDrawer } from "@/features/tasks/TaskDetailDrawer"

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <TaskDetailDrawer taskId={id} />
}
