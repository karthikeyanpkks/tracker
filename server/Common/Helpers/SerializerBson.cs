using System;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;

namespace Common.Helpers
{
    public class AntBsonSerializer : IBsonSerializer
    {
        public Type ValueType { get; } = typeof(string);

        public object Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
        {
            // TransportChargePaid
            if (context.Reader.CurrentBsonType == BsonType.Boolean)
            {
                return BooleanToString(context);
            }
            return context.Reader.ReadString();
        }

        public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, object value)
        {
            if (value == null)
            {
                value = string.Empty;
            }
            context.Writer.WriteString(value as string);
        }

        private static object BooleanToString(BsonDeserializationContext context)
        {
            var value = context.Reader.ReadBoolean();

            if (value == true)
                return "Paid";
            else if (value == false)
                return "To Pay";

            return value;
        }
    }
}
