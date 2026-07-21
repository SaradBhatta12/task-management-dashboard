import { TaskDetailDrawer } from "@/features/tasks/TaskDetailDrawer"

export default async function TaskDetailPage({ params }: PageProps<"/tasks/[id]">) {
  const { id } = await params

  return <TaskDetailDrawer taskId={id} />
}
