import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateWorkSpace = mutation({
  args: {
    message: v.any(),
    user: v.id('users'),
  },
  handler: async (ctx, args) => {
    try {
      // Verify the user exists
      const user = await ctx.db.get(args.user);
      if (!user) {
        throw new Error("User not found");
      }
      
      const workspaceId = await ctx.db.insert('workspace', {
        message: args.message,
        user: args.user,
      });
      return workspaceId;
    } catch (error) {
      console.error("Error creating workspace:", error);
      throw error;
    }
  },
});

export const GetWorkspace = query({
  args:{
    workspaceId:v.id('workspace')
  },
  handler: async (ctx, args) =>{
    const result = await ctx.db.get(args.workspaceId);
    return result;
  }
})

export const UpdateMessages= mutation({
  args:{
    workspaceId:v.id('workspace'),
    message:v.any()
  },
  handler:async (ctx, args)=>{
    const result=await ctx.db.patch(args.workspaceId,{message:args.message})
    return result;
  }
})
export const UpdateFiles= mutation({
  args:{
    workspaceId:v.id('workspace'),
    fileData:v.any()
  },
  handler:async (ctx, args)=>{
    const result=await ctx.db.patch(args.workspaceId,{fileData:args.fileData})
    return result;
  }
})

// Migration mutation to update existing workspace records
export const MigrateUserIds = mutation({
  args: {},
  handler: async (ctx) => {
    // Get all workspace records
    const workspaces = await ctx.db.query('workspace').collect();
    
    for (const workspace of workspaces) {
      try {
        // Get the user ID string and replace the table name
        const oldUserId = workspace.user.toString();
        if (oldUserId.includes('user_')) {
          // Convert old user ID to new users ID format
          const newUserId = oldUserId.replace('user_', 'users_');
          
          // Update the workspace with the new user ID format
          await ctx.db.patch(workspace._id, {
            user: newUserId as any
          });
        }
      } catch (error) {
        console.error('Error migrating workspace:', workspace._id, error);
      }
    }
    return "Migration completed";
  }
});
