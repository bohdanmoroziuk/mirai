export interface Group {
  id: string;
  name: string;
}

export type GroupId = Group['id'];

export type GroupName = Group['name'];

export interface Tool {
  id: string;
  name: string;
  url: string;
  image: string;
  group: Group | null;
}

export type ToolId = Tool['id'];

export type ToolBody = Omit<Tool, 'id'>;
